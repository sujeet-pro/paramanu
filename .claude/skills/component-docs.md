---
description: Apply when writing documentation for a Paramanu design system component, creating MDX doc pages, updating component docs, or adding usage examples, guidelines, or API reference. Auto-use when working in apps/docs/ or writing doc content for components.
---

# Component Documentation Guidelines

## Documentation Structure

Every component MUST have documentation with **3 tabs**:

### Tab 1: Usage
Purpose: Show developers how to use the component with practical examples.

Contents:
1. **Overview** - 1-2 sentence description of what the component does and when to use it
2. **Import** - Show all import methods (React, vanilla JS, CDN)
3. **Basic Example** - Simplest usage with live playground
4. **Variants** - Example for each visual variant with explanation of when to use each
5. **Sizes** - Example showing all size options
6. **States** - Examples of disabled, loading, error, active states
7. **Composition** - Examples combining with other components (e.g., Button with Icon)
8. **Common Patterns** - Real-world usage patterns (form submit, dialog trigger, etc.)

#### Example Format (MDX)
```mdx
## Basic Usage

Use the `Button` component for triggering actions. Default variant is `primary` with size `md`.

<Playground>
  <Button>Click me</Button>
</Playground>

## Variants

### Primary
Use for the main call-to-action on the page. Limit to one primary button per section.

<Playground>
  <Button variant="primary">Save Changes</Button>
</Playground>

### Secondary
Use for secondary actions that complement the primary action.

<Playground>
  <Button variant="secondary">Cancel</Button>
</Playground>

### When to Use Each Variant
| Variant | Use When |
|---------|----------|
| Primary | Main action, form submit, confirmation |
| Secondary | Cancel, back, alternative action |
| Danger | Delete, remove, destructive action |
| Ghost | Tertiary action, toolbar buttons, minimal emphasis |
```

### Tab 2: Guidelines

Contents:

#### Accessibility Guidelines Section
For each component, document:

1. **Keyboard Interactions** - Table of all keyboard shortcuts
   ```
   | Key | Action |
   |-----|--------|
   | Enter / Space | Activates the button |
   | Tab | Moves focus to the next focusable element |
   ```

2. **ARIA Attributes Provided** - What the component handles automatically
   ```
   | Attribute | Handled By | Description |
   |-----------|-----------|-------------|
   | role="button" | Semantic `<button>` element | Implicit role |
   | aria-disabled | `disabled` prop | Communicates disabled state |
   ```

3. **Consumer Responsibilities** - What the developer MUST add themselves
   ```
   - Provide `aria-label` for icon-only buttons
   - Ensure color contrast of custom button content meets 4.5:1 ratio
   - Do not remove focus indicators
   ```

4. **Screen Reader Behavior** - How the component is announced

#### Performance Guidelines Section
- When to memoize callbacks passed to the component
- Avoiding unnecessary re-renders
- CSS containment recommendations
- Virtualization recommendations (for list/table components)
- Bundle size impact

#### Design Guidelines Section
- Do's and Don'ts with visual examples
- Spacing and alignment recommendations
- Responsive behavior
- Content guidelines (text length, capitalization, etc.)

### Tab 3: API

Contents:

1. **Props Table** - Every prop with type, default, and description
   ```
   | Prop | Type | Default | Description |
   |------|------|---------|-------------|
   | variant | `"primary" \| "secondary" \| "danger" \| "ghost"` | `"primary"` | Visual style variant |
   | size | `"sm" \| "md" \| "lg"` | `"md"` | Button size |
   | disabled | `boolean` | `false` | Disables the button |
   | fullWidth | `boolean` | `false` | Makes the button take full container width |
   | type | `"button" \| "submit" \| "reset"` | `"button"` | HTML button type |
   ```

2. **CSS Custom Properties** - All overridable CSS variables
   ```
   | Variable | Default | Description |
   |----------|---------|-------------|
   | --pm-button-padding-x | var(--pm-spacing-4) | Horizontal padding |
   ```

3. **CSS Classes** - For vanilla/CDN consumers
   ```
   | Class | Description |
   |-------|-------------|
   | .pm-button | Base button class |
   | .pm-button--primary | Primary variant |
   ```

4. **Events** - For components with custom events
5. **Slots/Children** - What can be passed as children
6. **Ref** - What element the ref points to

## Doc File Location

Documentation MDX files go in `apps/docs/src/content/docs/components/<package>/<component>.mdx`

Example: `apps/docs/src/content/docs/components/buttons/button.mdx`

## Writing Style
- Use second person ("you") when addressing the developer
- Be concise and direct
- Show code before explaining it
- Every guideline should have a concrete example
- Avoid marketing language - be technical and factual
