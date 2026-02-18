# Writing Stories Guidelines

Apply when creating or modifying Storybook stories for Paramanu components, whether vanilla HTML or React.

---

## 1. Story File Location

Stories live **inside component packages**, not inside the Storybook apps.

| Framework | Story Location | Extension |
|---|---|---|
| Vanilla (HTML) | `packages/<group>-js/src/<component>/<component>.stories.ts` | `.stories.ts` |
| React | `packages/<group>-react/src/<component>/<component>.stories.tsx` | `.stories.tsx` |

Storybook apps load stories from packages using workspace-aware glob patterns:

```typescript
// apps/storybook-react/.storybook/main.ts
stories: [
  "../../../packages/*-react/src/**/*.stories.@(ts|tsx)",
]

// apps/storybook-vanilla/.storybook/main.ts
stories: [
  "../../../packages/*-js/src/**/*.stories.@(ts|tsx)",
]
```

---

## 2. Story Meta Configuration

### Title Hierarchy

Use a consistent title hierarchy: `<Group>/<ComponentName>`

```typescript
// In buttons-react/src/button/button.stories.tsx
const meta = {
  title: "Buttons/Button",
  component: Button,
  ...
} satisfies Meta<typeof Button>

// In feedback-js/src/alert/alert.stories.ts
const meta = {
  title: "Feedback/Alert",
  ...
} satisfies Meta<AlertArgs>
```

Group names match package group names: `Primitives`, `Typography`, `Buttons`, `Forms`, `Navigation`, `Data Display`, `Feedback`, `Overlays`, `Disclosure`, `Utilities`.

### ArgTypes

Define controls for every prop:

```typescript
argTypes: {
  variant: {
    control: "select",
    options: ["primary", "secondary", "danger", "ghost"],
    description: "Visual style variant",
    table: {
      type: { summary: "ButtonVariant" },
      defaultValue: { summary: '"primary"' },
    },
  },
  size: {
    control: "select",
    options: ["sm", "md", "lg"],
    description: "Component size",
    table: {
      type: { summary: "ButtonSize" },
      defaultValue: { summary: '"md"' },
    },
  },
  disabled: {
    control: "boolean",
    description: "Whether the button is disabled",
    table: { defaultValue: { summary: "false" } },
  },
}
```

### Default Args

Set sensible defaults that show the component in its most common state:

```typescript
args: {
  variant: "primary",
  size: "md",
  children: "Button", // React
  // or
  label: "Button",    // Vanilla
}
```

### Tags and Autodocs

Enable autodocs on the meta to generate documentation pages:

```typescript
const meta = {
  title: "Buttons/Button",
  component: Button,
  tags: ["autodocs"],
  ...
} satisfies Meta<typeof Button>
```

---

## 3. Required Stories Per Component

Every component MUST have the following stories. This ensures complete visual coverage and enables comprehensive testing.

### 3a. Playground (Default)

The first story — a fully controllable version with all props exposed:

```typescript
export const Playground: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Button",
  },
}
```

### 3b. One Story Per Variant

```typescript
export const Primary: Story = {
  args: { variant: "primary", children: "Primary Button" },
}

export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary Button" },
}

export const Danger: Story = {
  args: { variant: "danger", children: "Danger Button" },
}

export const Ghost: Story = {
  args: { variant: "ghost", children: "Ghost Button" },
}
```

### 3c. One Story Per Size

```typescript
export const Small: Story = {
  args: { size: "sm", children: "Small" },
}

export const Medium: Story = {
  args: { size: "md", children: "Medium" },
}

export const Large: Story = {
  args: { size: "lg", children: "Large" },
}
```

### 3d. One Story Per Boolean Modifier

```typescript
export const Disabled: Story = {
  args: { disabled: true, children: "Disabled" },
}

export const FullWidth: Story = {
  args: { fullWidth: true, children: "Full Width" },
}
```

### 3e. Variant x Size Matrix

A single story showing all variant-size combinations in a grid:

```typescript
export const AllVariantsAndSizes: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, auto)", gap: "16px", alignItems: "center" }}>
      {(["primary", "secondary", "danger", "ghost"] as const).map((variant) =>
        (["sm", "md", "lg"] as const).map((size) => (
          <Button key={`${variant}-${size}`} variant={variant} size={size}>
            {variant} {size}
          </Button>
        )),
      )}
    </div>
  ),
}
```

### 3f. All States

```typescript
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
      {/* Add loading, error, active states if the component supports them */}
    </div>
  ),
}
```

### 3g. Composition with Other Components

Show the component used alongside related components:

```typescript
export const WithIcon: Story = {
  render: () => (
    <Button>
      <IconPlus /> Add Item
    </Button>
  ),
}

export const InButtonGroup: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="primary">Save</Button>
      <Button variant="secondary">Cancel</Button>
    </ButtonGroup>
  ),
}
```

### 3h. Edge Cases

```typescript
export const LongText: Story = {
  args: {
    children: "This is a very long button label that might overflow or wrap",
  },
}

export const Truncated: Story = {
  render: () => (
    <div style={{ width: "120px" }}>
      <Button fullWidth>Truncated Long Text</Button>
    </div>
  ),
}
```

---

## 4. Vanilla (HTML) Story Pattern

For `-js` package stories, create DOM elements manually:

```typescript
import type { Meta, StoryObj } from "@storybook/html"
import { alertClasses } from "./alert.classes.js"
import type { AlertClassesOptions } from "./alert.types.js"

interface AlertArgs extends AlertClassesOptions {
  message: string
}

function createAlert(args: AlertArgs): HTMLElement {
  const container = document.createElement("div")
  container.className = alertClasses({
    variant: args.variant,
    size: args.size,
    dismissible: args.dismissible,
  })
  container.setAttribute("role", "alert")
  container.textContent = args.message
  return container
}

const meta = {
  title: "Feedback/Alert",
  tags: ["autodocs"],
  render: (args) => createAlert(args as AlertArgs),
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    dismissible: { control: "boolean" },
    message: { control: "text" },
  },
  args: {
    message: "This is an alert message",
    variant: "info",
    size: "md",
  },
} satisfies Meta<AlertArgs>

export default meta
type Story = StoryObj<AlertArgs>

export const Info: Story = {
  args: { variant: "info", message: "Info alert" },
}
```

### Complex Vanilla Stories (Multiple Elements)

For stories that need multiple elements or nested structure:

```typescript
function createButtonGroup(args: ButtonGroupArgs): HTMLElement {
  const group = document.createElement("div")
  group.className = buttonGroupClasses({ orientation: args.orientation })
  group.setAttribute("role", "group")
  group.setAttribute("aria-label", "Button group")

  const btn1 = document.createElement("button")
  btn1.className = buttonClasses({ variant: "primary" })
  btn1.textContent = "First"
  group.appendChild(btn1)

  const btn2 = document.createElement("button")
  btn2.className = buttonClasses({ variant: "secondary" })
  btn2.textContent = "Second"
  group.appendChild(btn2)

  return group
}
```

---

## 5. React Story Pattern

```typescript
import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./button.js"

const meta = {
  title: "Buttons/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
  args: {
    children: "Button",
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { variant: "primary", children: "Primary Button" },
}
```

---

## 6. Interaction Tests (Play Functions)

Add play functions for interactive behavior testing. These run in the Storybook UI and can be executed as tests via `@storybook/test-runner`.

```typescript
import { expect, fn, userEvent, within } from "@storybook/test"

export const ClickTest: Story = {
  args: {
    children: "Click Me",
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")

    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const KeyboardNavigation: Story = {
  args: { children: "Focus Me" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")

    await userEvent.tab()
    await expect(button).toHaveFocus()

    await userEvent.keyboard("{Enter}")
    // Assert expected behavior
  },
}

export const DisabledNotClickable: Story = {
  args: {
    disabled: true,
    children: "Disabled",
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")

    await userEvent.click(button)
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}
```

---

## 7. Accessibility in Stories

### A11y Addon Configuration

The `@storybook/addon-a11y` addon runs axe-core checks on every story. Configure per-story parameters when needed:

```typescript
export const IconOnly: Story = {
  args: {
    "aria-label": "Close",
    children: "X",
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          // Customize rules for this specific story
          { id: "color-contrast", enabled: true },
        ],
      },
    },
  },
}
```

### Stories That Demonstrate A11y Features

Create stories specifically for accessibility:

```typescript
export const WithAriaLabel: Story = {
  name: "Icon Button with aria-label",
  args: {
    "aria-label": "Delete item",
    children: <TrashIcon />,
  },
}

export const FocusVisible: Story = {
  name: "Focus Ring (keyboard focus)",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")
    await userEvent.tab()
    await expect(button).toHaveFocus()
    // Focus ring should now be visible
  },
}
```

---

## 8. Story Documentation

### Inline Docs

Use JSDoc comments on stories for autodocs:

```typescript
/**
 * The primary variant is the default and highest-emphasis button.
 * Use for the main call-to-action on the page.
 */
export const Primary: Story = { ... }

/**
 * Use the ghost variant for tertiary actions and toolbar buttons
 * where minimal visual emphasis is needed.
 */
export const Ghost: Story = { ... }
```

### Story Parameters for Docs

```typescript
export const Primary: Story = {
  args: { ... },
  parameters: {
    docs: {
      description: {
        story: "Primary variant for main call-to-action.",
      },
    },
  },
}
```

---

## 9. Story Checklist

Before a component's stories are complete:

- [ ] Playground story with all controls
- [ ] One story per variant value
- [ ] One story per size value
- [ ] One story per boolean modifier
- [ ] Variant x Size matrix story
- [ ] All states story (disabled, loading, error, etc.)
- [ ] Composition stories with related components
- [ ] Edge case stories (long text, overflow, constrained container)
- [ ] Play functions for interactive behavior
- [ ] A11y-specific stories (aria-label, focus ring, keyboard nav)
- [ ] JSDoc descriptions on exported stories
- [ ] autodocs tag enabled on meta
