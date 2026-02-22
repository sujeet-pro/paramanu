# Writing Documentation Guidelines

Apply when writing component documentation pages, MDX files, or updating the Paramanu docs site.

---

## 1. Doc File Location

Documentation MDX files live in:

```
apps/docs/src/content/docs/components/<group>/<component>.mdx
```

Example: `apps/docs/src/content/docs/components/buttons/button.mdx`

Add each new doc page to the Starlight sidebar in `apps/docs/astro.config.mjs`.

---

## 2. Three-Tab Documentation Structure

Every component MUST have documentation organized into **3 tabs**:

### Tab 1: Usage

Purpose: Show developers how to use the component with practical examples.

Contents in order:

1. **Overview** — 1-2 sentences describing what the component does and when to use it
2. **Import** — All import methods:

   ````mdx
   ### React

   ```tsx
   import { Button } from "@paramanu/buttons-react"
   ```
   ````

   ### Vanilla JS

   ```ts
   import { buttonClasses } from "@paramanu/buttons-js"
   import "@paramanu/buttons-js/css"
   ```

   ### CDN

   ```html
   <link rel="stylesheet" href="https://cdn.paramanu.dev/buttons.min.css" />
   <script type="module" src="https://cdn.paramanu.dev/buttons.min.js"></script>
   ```

   ```

   ```

3. **Basic Example** — Simplest usage with a live code playground
4. **Variants** — Each variant with a code example and 1-sentence explanation of when to use it
5. **Sizes** — All size options shown together
6. **States** — Disabled, loading, error, active states
7. **Composition** — Combining with other components (e.g., Button + Icon, Button in ButtonGroup)
8. **Common Patterns** — Real-world usage patterns (form submit, dialog trigger, toolbar, etc.)

### Tab 2: Guidelines

Contents in order:

#### Accessibility Section

1. **Keyboard Interactions** — Table of all keyboard shortcuts:

   ```
   | Key | Action |
   |-----|--------|
   | Enter / Space | Activates the button |
   | Tab | Moves focus to next focusable element |
   ```

2. **ARIA Attributes Provided** — What the component handles:

   ```
   | Attribute | Source | Description |
   |-----------|--------|-------------|
   | role="button" | Semantic <button> | Implicit role |
   | aria-disabled | disabled prop | Communicates disabled state |
   ```

3. **Consumer Responsibilities** — What the developer must add:

   ```
   - Provide `aria-label` for icon-only buttons
   - Ensure custom content meets 4.5:1 contrast ratio
   - Do not remove focus indicators
   ```

4. **Screen Reader Behavior** — How screen readers announce the component

#### Performance Section

- When to memoize callbacks
- Avoiding unnecessary re-renders
- CSS containment recommendations
- Virtualization (for list/table components)
- Bundle size impact

#### Design Section

- Do's and Don'ts
- Spacing and alignment recommendations
- Responsive behavior
- Content guidelines (text length, capitalization)

### Tab 3: API

Contents in order:

1. **Props Table** — MUST be auto-derived from TypeScript interfaces and JSDoc:

   ```
   | Prop | Type | Default | Description |
   |------|------|---------|-------------|
   | variant | `"primary" \| "secondary" \| "danger" \| "ghost"` | `"primary"` | Visual style |
   | size | `"sm" \| "md" \| "lg"` | `"md"` | Component size |
   | disabled | `boolean` | `false` | Disables interaction |
   ```

2. **CSS Custom Properties** — Overridable CSS variables:

   ```
   | Variable | Default | Description |
   |----------|---------|-------------|
   | --pm-button-padding-x | var(--pm-spacing-4) | Horizontal padding |
   | --pm-button-bg | var(--pm-color-primary-500) | Background color |
   ```

3. **CSS Classes** — For vanilla/CDN consumers:

   ```
   | Class | Description |
   |-------|-------------|
   | .pm-button | Base button class |
   | .pm-button--primary | Primary variant |
   | .pm-button--sm | Small size |
   ```

4. **Events** — Custom events (if any)
5. **Children/Slots** — What can be passed as children
6. **Ref** — What HTML element the ref points to

---

## 3. API Auto-Generation

The API tab props table should be auto-derived from the source code rather than manually maintained. This ensures the docs never drift from the implementation.

### Strategy

1. **JSDoc comments on every prop** in the `*.types.ts` file are the source of truth
2. Use `@default` tags for default values
3. Use type signatures directly (union types, interfaces)
4. A build-time script extracts JSDoc + types to generate the props table

### JSDoc Requirements for API Extraction

```typescript
export interface ButtonClassesOptions {
  /**
   * Visual style variant.
   * @default "primary"
   */
  variant?: ButtonVariant

  /**
   * Component size.
   * @default "md"
   */
  size?: ButtonSize
}
```

These comments are extracted to populate:

- **Description** column from the JSDoc comment body
- **Default** column from `@default` tag
- **Type** column from the TypeScript type

---

## 4. Live Playground Integration

Use Sandpack (CodeSandbox) for interactive code playgrounds in docs:

```mdx
import { Sandpack } from "@codesandbox/sandpack-react"

<Sandpack
  template="react"
  files={{
    "/App.js": `import { Button } from "@paramanu/buttons-react"
import "@paramanu/buttons-js/css"

export default function App() {
  return <Button variant="primary">Click me</Button>
}`
  }}
  customSetup={{
    dependencies: {
      "@paramanu/buttons-react": "latest",
      "@paramanu/buttons-js": "latest",
    }
  }}
/>
```

For vanilla examples, use the `vanilla` template.

---

## 5. Writing Style

- **Second person** — "You can use..." not "Developers can use..."
- **Concise and direct** — No marketing language, be technical
- **Show code first** — Put the code example before the explanation
- **Every guideline has an example** — No abstract rules without concrete code
- **Use present tense** — "The button renders..." not "The button will render..."
- **Avoid "simply" and "just"** — These minimize complexity
- **Link to related components** — Cross-reference within the docs

---

## 6. Sidebar Organization

The docs sidebar mirrors the package groups:

```
Getting Started
  Introduction
  Installation
  Theming
  Accessibility

Components
  Primitives
    Box
    Flex
    Stack
    ...
  Typography
    Text
    Heading
    ...
  Buttons
    Button
    Button Group
    ...
  Forms
    Input
    Select
    ...
  Navigation
    Tabs
    Breadcrumb
    ...
  Data Display
    Card
    Table
    ...
  Feedback
    Alert
    Toast
    ...
  Overlays
    Dialog
    Tooltip
    ...
  Disclosure
    Accordion
    Collapse
    ...
  Utilities
    Portal
    Focus Trap
    ...

Tokens
  Colors
  Spacing
  Typography

Storybooks
  React Storybook
  Vanilla Storybook
```

---

## 7. Documentation Checklist

Before a component's documentation is complete:

- [ ] MDX file created at correct path
- [ ] Added to sidebar in `astro.config.mjs`
- [ ] Usage tab: overview, imports (React + vanilla + CDN), basic example, all variants, all sizes, states, composition, patterns
- [ ] Guidelines tab: keyboard interactions, ARIA attributes, consumer responsibilities, performance tips, design guidelines
- [ ] API tab: props table (from JSDoc), CSS variables, CSS classes, events, children/slots, ref
- [ ] All code examples are tested and correct
- [ ] Cross-references to related components
