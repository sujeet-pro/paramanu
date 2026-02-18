# Writing Code Guidelines

Apply when writing or modifying any TypeScript, TSX, CSS, or configuration files in the Paramanu design system.

---

## 1. TypeScript Conventions

### Strict Mode

All TypeScript code must be strictly typed. No `any` types unless absolutely unavoidable (annotate with `// eslint-disable-next-line @typescript-eslint/no-explicit-any -- <reason>`).

```typescript
// CORRECT
function buttonClasses(options: ButtonClassesOptions = {}): string { ... }

// WRONG
function buttonClasses(options: any): string { ... }
```

### Type Organization

- Export types from dedicated `*.types.ts` files
- Use `export type` for type-only exports
- Use `interface` for object shapes (extensible via declaration merging)
- Use `type` for unions, aliases, and mapped types
- Prefix internal-only types with `/** @internal */` JSDoc tag

```typescript
// button.types.ts
export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost"
export type ButtonSize = "sm" | "md" | "lg"

export interface ButtonClassesOptions {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  fullWidth?: boolean
}

export interface ButtonProps extends ButtonClassesOptions {
  type?: "button" | "submit" | "reset"
}
```

### Generic Patterns

Use generics for compound components and polymorphic elements:

```typescript
// Polymorphic component
export interface BoxProps<E extends React.ElementType = "div"> {
  as?: E
}

// Collection component
export interface ListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
}
```

### Module System

- All packages use `"type": "module"` (ESM only)
- Use `.js` extension in imports even for TypeScript files: `import { foo } from "./foo.js"`
- Use `import type` for type-only imports
- Named exports only — no default exports (except Storybook meta)

```typescript
// CORRECT
import { buttonClasses } from "./button.classes.js"
import type { ButtonProps } from "./button.types.js"

// WRONG
import buttonClasses from "./button.classes"
```

---

## 2. JSDoc Conventions

Every exported function, type, interface, and component MUST have JSDoc. This serves three purposes:
1. **Editor IntelliSense** — hover documentation in VS Code / IDEs
2. **API doc generation** — extracted to build the API Reference tab in docs
3. **Storybook autodocs** — populates the Docs tab in Storybook

### Function JSDoc Template

```typescript
/**
 * Generates BEM class names for the Button component.
 *
 * @param options - Configuration for variant, size, and modifiers
 * @returns Space-separated CSS class string
 *
 * @example
 * ```ts
 * buttonClasses() // "pm-button pm-button--primary pm-button--md"
 * buttonClasses({ variant: "danger", size: "lg" }) // "pm-button pm-button--danger pm-button--lg"
 * ```
 *
 * @see {@link buttonModuleClasses} for CSS Modules version
 * @since 1.0.0
 */
export function buttonClasses(options: ButtonClassesOptions = {}): string { ... }
```

### Type/Interface JSDoc Template

```typescript
/**
 * Visual style variants for the Button component.
 *
 * - `"primary"` — Main call-to-action, high emphasis
 * - `"secondary"` — Supporting action, medium emphasis
 * - `"danger"` — Destructive action (delete, remove)
 * - `"ghost"` — Minimal emphasis, tertiary action
 *
 * @since 1.0.0
 */
export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost"

/**
 * Configuration options for generating Button CSS classes.
 *
 * @example
 * ```ts
 * const opts: ButtonClassesOptions = { variant: "danger", size: "lg", disabled: true }
 * ```
 */
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

  /**
   * Whether the button is disabled.
   * Adds `pm-button--disabled` class. Consumer must also set `disabled` and `aria-disabled` attributes.
   * @default false
   */
  disabled?: boolean

  /**
   * Whether the button spans the full width of its container.
   * @default false
   */
  fullWidth?: boolean
}
```

### React Component JSDoc Template

```typescript
/**
 * A clickable button element for triggering actions.
 *
 * Renders a native `<button>` element with Paramanu styling. Supports variants,
 * sizes, and modifiers via props. Forwards refs to the underlying button element.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg">Save Changes</Button>
 * <Button variant="danger" disabled>Delete</Button>
 * ```
 *
 * @see {@link https://paramanu.dev/components/buttons/button | Documentation}
 * @since 1.0.0
 */
export const Button = forwardRef<HTMLButtonElement, ReactButtonProps>(...)
```

### JSDoc Rules

1. **Every prop gets a JSDoc comment** with `@default` if it has a default value
2. **Every union value gets a description** (inline in the type JSDoc or per-member)
3. **Use `@example` with code fences** for all exported functions and components
4. **Use `@see` for cross-references** between related functions/types
5. **Use `@since`** on all public API surfaces
6. **Use `@deprecated`** with migration instructions when breaking changes occur
7. **Use `@internal`** for exports that should not be part of the public API docs
8. **Do not use `@param` for React props** — document them on the interface instead

---

## 3. File Naming Convention

All files follow the pattern: `<component-name>.<type>.<ext>`

| Type | Description | Example |
|------|-------------|---------|
| `types` | TypeScript interfaces and types | `button.types.ts` |
| `classes` | Class builder functions (core) | `button.classes.ts` |
| `css` | Component CSS (both `.css` and `.module.css`) | `button.css`, `button.module.css` |
| `component` | Framework component (vanilla) | `button.component.ts` |
| `tsx` / no suffix | React component | `button.tsx` |
| `hook` | React hooks | `use-button.hook.ts` |
| `provider` | React context providers | `theme.provider.tsx` |
| `constant` | Constants | `button.constant.ts` |
| `test` | Unit tests | `button.test.ts` |
| `a11y.test` | Accessibility tests | `button.a11y.test.ts` |
| `stories` | Storybook stories | `button.stories.tsx` |

---

## 4. Component Architecture

### JS Package Structure (`-js`)

Each component in a `-js` package produces these files:

```
src/<component>/
  <component>.types.ts      — Types and interfaces
  <component>.classes.ts     — BEM + CSS module class builders
  <component>.css            — Nested CSS in @layer pm.components
  <component>.module.css     — Flat CSS for CSS Modules
  <component>.test.ts        — Unit tests for class builders
  <component>.a11y.test.ts   — Accessibility tests with JSDOM
  <component>.stories.ts     — Vanilla Storybook stories
```

### React Package Structure (`-react`)

Each component in a `-react` package produces these files:

```
src/<component>/
  <component>.tsx            — forwardRef React component
  <component>.test.tsx       — React component tests
  <component>.stories.tsx    — React Storybook stories
```

### Class Builder Pattern

Every component exports two class builder functions:

```typescript
// BEM version — for plain HTML / CDN usage
export function alertClasses(options: AlertClassesOptions = {}): string {
  const { variant = "info", size = "md", dismissible } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`]
  if (dismissible) classes.push(`${BASE}--dismissible`)
  return classes.join(" ")
}

// CSS Modules version — for bundled apps
export function alertModuleClasses(
  classMap: Record<string, string>,
  options: AlertClassesOptions = {},
): string {
  // Same logic but looks up each class in classMap
}
```

### React Component Pattern

```typescript
export const Alert = forwardRef<HTMLDivElement, ReactAlertProps>(
  function Alert({ variant, size, dismissible, className, children, ...rest }, ref) {
    const classes = alertClasses({ variant, size, dismissible })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div ref={ref} role="alert" className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)
```

---

## 5. CSS Conventions

### Layer System

All component CSS MUST be inside `@layer pm.components`:

```css
@layer pm.components {
  .pm-alert { ... }
}
```

### BEM Naming

```
.pm-<component>                    — Block
.pm-<component>--<modifier>        — Modifier
.pm-<component>__<element>         — Element (child)
```

### Token Usage

All visual properties MUST use `--pm-*` tokens. Never hardcode values:

```css
/* CORRECT */
.pm-alert {
  padding: var(--pm-spacing-3) var(--pm-spacing-4);
  border-radius: var(--pm-radius-md);
  font-size: var(--pm-font-size-md);
}

/* WRONG */
.pm-alert {
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 1rem;
}
```

### Nesting vs Flat

- `*.css` files use CSS nesting (for BEM consumption)
- `*.module.css` files use flat selectors (CSS Modules requirement)

### Dark Mode

Use `light-dark()` for properties that differ between light and dark:

```css
.pm-card {
  background-color: light-dark(var(--pm-color-neutral-0), var(--pm-color-neutral-900));
  color: light-dark(var(--pm-color-neutral-900), var(--pm-color-neutral-50));
}
```

### Focus Styles

Always use `:focus-visible` (not `:focus`) with token-based ring:

```css
&:focus-visible {
  outline: var(--pm-focus-ring-width) solid var(--pm-color-primary-500);
  outline-offset: var(--pm-focus-ring-offset);
}
```

### Transitions

Always specify individual properties, never `transition: all`:

```css
/* CORRECT */
transition: background-color var(--pm-transition-fast), color var(--pm-transition-fast);

/* WRONG */
transition: all 150ms ease;
```

---

## 6. Cross-Package Reuse

When building a component, **always reuse existing class builders** from dependency packages rather than reimplementing:

| Need | Use From | Example |
|------|----------|---------|
| Layout | `primitives-js` | `flexClasses()`, `stackClasses()`, `groupClasses()` |
| Text | `typography-js` | `textClasses()`, `headingClasses()` |
| Close action | `buttons-js` | `closeButtonClasses()` |
| Portal/Focus | `utilities-js` | `Portal`, `FocusTrap`, `Presence` |

```typescript
// In feedback-js alert:
import { closeButtonClasses } from "@paramanu/buttons-js"
import { flexClasses } from "@paramanu/primitives-js"
```

**Never depend upward** — Level 1 packages must never import from Level 2+.

---

## 7. Performance

### CSS
- Use CSS containment (`contain`) for complex components
- Prefer CSS-only solutions over JS for visual states
- Minimize specificity — rely on layers, not selector weight
- Use `will-change` sparingly and only when proven necessary

### JavaScript
- Class builder functions must be pure and allocation-minimal
- Avoid unnecessary array/object allocations in hot paths
- React: use `forwardRef`, avoid inline object literals in render
- Memoize only when profiling proves it's needed

### Bundle Size
- Every export must be tree-shakeable
- No side effects in module scope (declare in package.json `sideEffects` if needed)
- CSS is separate from JS — consumers import what they need

---

## 8. Accessibility (WCAG 2.2 AA)

### Required for Every Component

1. **Semantic HTML** — Use correct elements (`<button>`, `<nav>`, `<dialog>`, etc.)
2. **Keyboard navigation** — All interactive components fully keyboard-operable
3. **Focus management** — `:focus-visible` rings, focus trapping in modals
4. **ARIA attributes** — Add `aria-*` where semantic HTML is insufficient
5. **Color contrast** — 4.5:1 for text, 3:1 for large text and UI components
6. **Screen reader support** — `aria-label`, `aria-describedby`, `aria-live` as needed
7. **Reduced motion** — Respect `prefers-reduced-motion`

### Disabled State Pattern

```typescript
// Always use BOTH disabled attribute AND aria-disabled
<button disabled aria-disabled={disabled || undefined}>
```

### Semantic Element Reference

| Component | Element |
|-----------|---------|
| Button | `<button>` |
| Link | `<a>` |
| Navigation | `<nav>` |
| Dialog | `<dialog>` |
| Input | `<input>` |
| Checkbox | `<input type="checkbox">` |
| Alert | `<div role="alert">` |
| Progress | `<progress>` |

---

## 9. Code Style (Prettier)

```
No semicolons
Double quotes
Trailing commas (all)
100 character print width
2-space indentation
LF line endings
```
