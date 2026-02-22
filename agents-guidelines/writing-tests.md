# Writing Tests Guidelines

Apply when writing unit tests, accessibility tests, or React component tests in the Paramanu design system.

---

## 1. Test Organization

### File Naming

| Test Type                | Location                                  | Naming                     |
| ------------------------ | ----------------------------------------- | -------------------------- |
| Class builder unit tests | `packages/<group>-js/src/<component>/`    | `<component>.test.ts`      |
| Accessibility tests      | `packages/<group>-js/src/<component>/`    | `<component>.a11y.test.ts` |
| React component tests    | `packages/<group>-react/src/<component>/` | `<component>.test.tsx`     |

### Test Structure

Use `describe` for grouping and `it` (not `test`) for individual test cases:

```typescript
describe("<ComponentName>", () => {
  describe("classes", () => {
    it("returns default classes", () => { ... })
    it("applies variant", () => { ... })
  })

  describe("accessibility", () => {
    it("renders correct semantic element", () => { ... })
  })
})
```

### Setup and Teardown

- Use `afterEach(cleanup)` in React tests
- Create helper functions for repetitive DOM construction in a11y tests
- Do NOT use `beforeAll` for test setup that creates DOM — each test should be independent

---

## 2. Class Builder Unit Tests (`-js` packages)

Test the `<component>Classes()` and `<component>ModuleClasses()` functions exhaustively.

### Required Test Cases

For every component, test ALL of the following:

#### Defaults

```typescript
it("returns default classes", () => {
  const result = buttonClasses()
  expect(result).toBe("pm-button pm-button--primary pm-button--md")
})
```

#### Every Variant Value

```typescript
it("applies each variant", () => {
  expect(buttonClasses({ variant: "primary" })).toContain("pm-button--primary")
  expect(buttonClasses({ variant: "secondary" })).toContain("pm-button--secondary")
  expect(buttonClasses({ variant: "danger" })).toContain("pm-button--danger")
  expect(buttonClasses({ variant: "ghost" })).toContain("pm-button--ghost")
})
```

#### Every Size Value

```typescript
it("applies each size", () => {
  expect(buttonClasses({ size: "sm" })).toContain("pm-button--sm")
  expect(buttonClasses({ size: "md" })).toContain("pm-button--md")
  expect(buttonClasses({ size: "lg" })).toContain("pm-button--lg")
})
```

#### Every Boolean Modifier (true AND false)

```typescript
it("applies disabled modifier", () => {
  expect(buttonClasses({ disabled: true })).toContain("pm-button--disabled")
  expect(buttonClasses({ disabled: false })).not.toContain("pm-button--disabled")
})
```

#### Combined Options

```typescript
it("combines multiple options correctly", () => {
  const result = buttonClasses({
    variant: "danger",
    size: "lg",
    disabled: true,
    fullWidth: true,
  })
  expect(result).toBe(
    "pm-button pm-button--danger pm-button--lg pm-button--disabled pm-button--full-width",
  )
})
```

#### Base Class Always Present

```typescript
it("always includes base class first", () => {
  expect(buttonClasses()).toMatch(/^pm-button\s/)
  expect(buttonClasses({ variant: "ghost" })).toMatch(/^pm-button\s/)
})
```

### Module Classes Tests

```typescript
describe("<component>ModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-button": "pm_abc_button",
    "pm-button--primary": "pm_abc_primary",
    "pm-button--md": "pm_abc_md",
    "pm-button--disabled": "pm_abc_disabled",
  }

  it("returns mapped default classes", () => {
    const result = buttonModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_button pm_abc_primary pm_abc_md")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = { "pm-button": "pm_abc_button" }
    const result = buttonModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_button")
    expect(result).not.toContain("undefined")
  })
})
```

---

## 3. Accessibility Tests (`-js` packages)

Test with JSDOM to verify semantic HTML and ARIA compliance. These tests validate the **markup pattern** that consumers should use with the class builders.

### Helper Function Pattern

```typescript
import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { alertClasses } from "./alert.classes.js"

function createAlertHTML(
  message: string,
  options: Parameters<typeof alertClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = alertClasses(options)
  return `<div role="alert" class="${classes}"${attrs ? " " + attrs : ""}>${message}</div>`
}
```

### Required A11y Test Cases

#### Correct Semantic Element

```typescript
it("renders as correct semantic element", () => {
  const dom = new JSDOM(`<!DOCTYPE html><body>${createAlertHTML("Info")}</body>`)
  const el = dom.window.document.querySelector("[role='alert']")
  expect(el).not.toBeNull()
})
```

#### ARIA Attributes

```typescript
it("has correct ARIA role", () => {
  const dom = new JSDOM(...)
  const el = dom.window.document.querySelector("[role='alert']")
  expect(el?.getAttribute("role")).toBe("alert")
})
```

#### Disabled State

```typescript
it("disabled state has aria-disabled", () => {
  const html = createButtonHTML("Click", { disabled: true })
  const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
  const button = dom.window.document.querySelector("button")
  expect(button?.getAttribute("aria-disabled")).toBe("true")
})
```

#### Accessible Name

```typescript
it("has accessible text content", () => {
  const dom = new JSDOM(`<!DOCTYPE html><body>${createAlertHTML("Error occurred")}</body>`)
  const el = dom.window.document.querySelector("[role='alert']")
  expect(el?.textContent).toBe("Error occurred")
})
```

#### aria-label Support for Icon-Only Elements

```typescript
it("supports aria-label for icon-only usage", () => {
  const html = createButtonHTML("X", {}, 'aria-label="Close dialog"')
  const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
  const button = dom.window.document.querySelector("button")
  expect(button?.getAttribute("aria-label")).toBe("Close dialog")
})
```

### axe-core Integration Tests

For components with complex ARIA patterns, add axe-core automated checks:

```typescript
import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { configureAxe, toHaveNoViolations } from "jest-axe"

expect.extend(toHaveNoViolations)

const axe = configureAxe({
  rules: {
    // Disable rules that don't apply in JSDOM
    "color-contrast": { enabled: false },
    region: { enabled: false },
  },
})

it("has no axe violations", async () => {
  const dom = new JSDOM(`<!DOCTYPE html><body>${createAlertHTML("Info")}</body>`)
  const results = await axe(dom.window.document.body)
  expect(results).toHaveNoViolations()
})
```

### Keyboard Navigation Tests (Interactive Components)

For interactive components (buttons, tabs, accordions, menus), test keyboard behavior:

```typescript
it("button is focusable via Tab", () => {
  const dom = new JSDOM(`<!DOCTYPE html><body>${createButtonHTML("Click")}</body>`)
  const button = dom.window.document.querySelector("button")
  expect(button?.tabIndex).not.toBe(-1)
})

it("disabled button is not focusable", () => {
  const dom = new JSDOM(
    `<!DOCTYPE html><body>${createButtonHTML("Click", { disabled: true })}</body>`,
  )
  const button = dom.window.document.querySelector("button")
  expect(button?.disabled).toBe(true)
})
```

---

## 4. React Component Tests (`-react` packages)

Test with `@testing-library/react`. Focus on behavior, not implementation details.

### Required Test Cases

For every React component, test ALL of the following:

#### Renders with Content

```typescript
it("renders with text content", () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument()
})
```

#### Applies Default Classes

```typescript
it("applies default classes", () => {
  render(<Button>Default</Button>)
  const button = screen.getByRole("button")
  expect(button.className).toContain("pm-button")
  expect(button.className).toContain("pm-button--primary")
  expect(button.className).toContain("pm-button--md")
})
```

#### Variant/Size/Modifier Props

```typescript
it("applies variant class", () => {
  render(<Button variant="danger">Danger</Button>)
  expect(screen.getByRole("button").className).toContain("pm-button--danger")
})
```

#### Forwards Ref

```typescript
it("forwards ref", () => {
  let ref: HTMLButtonElement | null = null
  render(<Button ref={(el) => (ref = el)}>Ref</Button>)
  expect(ref).toBeInstanceOf(HTMLButtonElement)
})
```

#### Merges Custom className

```typescript
it("merges custom className", () => {
  render(<Button className="custom">Custom</Button>)
  const button = screen.getByRole("button")
  expect(button.className).toContain("pm-button")
  expect(button.className).toContain("custom")
})
```

#### Passes Through HTML Attributes

```typescript
it("passes through data attributes", () => {
  render(<Button data-testid="my-button">Test</Button>)
  expect(screen.getByTestId("my-button")).toBeInTheDocument()
})
```

#### Disabled State

```typescript
it("sets disabled and aria-disabled", () => {
  render(<Button disabled>Disabled</Button>)
  const button = screen.getByRole("button")
  expect(button).toBeDisabled()
  expect(button).toHaveAttribute("aria-disabled", "true")
})
```

#### Event Handlers

```typescript
it("calls onClick handler", async () => {
  const onClick = vi.fn()
  render(<Button onClick={onClick}>Click</Button>)
  await userEvent.click(screen.getByRole("button"))
  expect(onClick).toHaveBeenCalledOnce()
})

it("does not call onClick when disabled", async () => {
  const onClick = vi.fn()
  render(<Button disabled onClick={onClick}>Click</Button>)
  await userEvent.click(screen.getByRole("button"))
  expect(onClick).not.toHaveBeenCalled()
})
```

### Query Priority

Follow Testing Library's query priority:

1. `getByRole` (preferred for a11y)
2. `getByLabelText` (form inputs)
3. `getByText` (text content)
4. `getByTestId` (last resort)

### What NOT to Test

- Internal state variables
- Internal function calls
- CSS class string ordering (test with `toContain`, not exact match)
- Implementation details of the class builder (tested separately in `-js`)

---

## 5. Portable Stories as Test Cases

Use Storybook's `composeStories` to reuse stories as test cases. This ensures stories and tests stay in sync.

```typescript
// button.test.tsx
import { composeStories } from "@storybook/react"
import { render, screen } from "@testing-library/react"
import * as stories from "./button.stories.js"

const { Primary, Disabled, FullWidth } = composeStories(stories)

it("Primary story renders correctly", () => {
  render(<Primary />)
  expect(screen.getByRole("button")).toHaveClass("pm-button--primary")
})

it("Disabled story is disabled", () => {
  render(<Disabled />)
  expect(screen.getByRole("button")).toBeDisabled()
})
```

### Story Play Functions as Integration Tests

Stories with `play` functions serve as both visual demos and automated tests:

```typescript
export const ClickInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")
    await userEvent.click(button)
    await expect(button).toHaveFocus()
  },
}
```

---

## 6. Coverage Expectations

### Minimum Required Coverage Per Component

| Test Type       | What Must Be Covered                                                                                             |
| --------------- | ---------------------------------------------------------------------------------------------------------------- |
| Class builder   | All variants, all sizes, all boolean modifiers (true + false), combinations, base class presence                 |
| Module classes  | Mapped defaults, each variant, missing map entries                                                               |
| Accessibility   | Semantic element, ARIA role, ARIA attributes, disabled state, accessible name, aria-label support                |
| React component | Rendering, default classes, each prop, ref forwarding, className merge, HTML passthrough, disabled state, events |

### Combination Matrix

For components with multiple axes (variant x size), test at least:

- Each variant with default size
- Each size with default variant
- At least one non-default combination (e.g., `danger` + `lg` + `disabled`)

You do NOT need to test every possible permutation — focus on meaningful combinations.

---

## 7. Test Utilities

### Common Patterns

```typescript
// Create DOM helper for a11y tests
function createHTML(tag: string, classes: string, content: string, attrs: string = ""): string {
  return `<${tag} class="${classes}"${attrs ? " " + attrs : ""}>${content}</${tag}>`
}

// Cleanup in React tests
afterEach(cleanup)
```

### Vitest Configuration

Each package has its own `vitest.config.ts`:

```typescript
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    environment: "jsdom", // for -react and a11y tests
  },
})
```
