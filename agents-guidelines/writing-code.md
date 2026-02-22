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

````typescript
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
````

### Type/Interface JSDoc Template

````typescript
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
````

### React Component JSDoc Template

````typescript
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
````

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

| Type              | Description                                   | Example                           |
| ----------------- | --------------------------------------------- | --------------------------------- |
| `types`           | TypeScript interfaces and types               | `button.types.ts`                 |
| `classes`         | Class builder functions (core)                | `button.classes.ts`               |
| `css`             | Component CSS (both `.css` and `.module.css`) | `button.css`, `button.module.css` |
| `component`       | Framework component (vanilla)                 | `button.component.ts`             |
| `tsx` / no suffix | React component                               | `button.tsx`                      |
| `hook`            | React hooks                                   | `use-button.hook.ts`              |
| `provider`        | React context providers                       | `theme.provider.tsx`              |
| `constant`        | Constants                                     | `button.constant.ts`              |
| `test`            | Unit tests                                    | `button.test.ts`                  |
| `a11y.test`       | Accessibility tests                           | `button.a11y.test.ts`             |
| `stories`         | Storybook stories                             | `button.stories.tsx`              |

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

### Modern CSS Features

Use modern CSS features natively — no preprocessors needed:

- **CSS Nesting** — `& .child`, `&:hover`, `&.modifier` (native, no Sass)
- **CSS Custom Properties** — `var(--pm-*)` for all design decisions
- **`light-dark()`** — Automatic dark mode via `color-scheme`
- **`@layer`** — Cascade layer isolation (`pm.reset`, `pm.tokens`, `pm.components`, etc.)
- **`@property`** — Typed custom properties with `syntax`, `inherits`, `initial-value`
- **`:focus-visible`** — Keyboard-only focus rings (not `:focus`)
- **`color-scheme: light dark`** — Enables `light-dark()` and system color adaptation
- **CSS Logical Properties** — Prefer `inline-size`, `block-size`, `margin-inline`, `padding-block` for RTL support
- **`gap`** — Flexbox/grid gap (no margin hacks)
- **`aspect-ratio`** — Native aspect ratio
- **`@container`** — Container queries where appropriate (component-level responsiveness)

```css
/* Example using modern features */
@layer pm.components {
  .pm-card {
    background: var(--pm-bg);
    color: var(--pm-fg);
    border: 1px solid var(--pm-border);
    border-radius: var(--pm-radius-md);
    padding: var(--pm-spacing-4);
    transition: box-shadow var(--pm-transition-fast);

    &:hover {
      box-shadow: var(--pm-shadow-md);
    }

    &:focus-visible {
      outline: var(--pm-focus-ring-width) solid var(--pm-focus-ring);
      outline-offset: var(--pm-focus-ring-offset);
    }
  }
}
```

### Layer System

All component CSS MUST be inside `@layer pm.components`:

```css
@layer pm.components {
  .pm-alert { ... }
}
```

Layer order (declared in `packages/tokens/src/layers.css`):

```css
@layer pm.reset, pm.tokens, pm.base, pm.components, pm.utilities;
```

| Layer           | Purpose                                                  |
| --------------- | -------------------------------------------------------- |
| `pm.reset`      | CSS reset/normalize                                      |
| `pm.tokens`     | CSS custom property definitions (primitives + semantics) |
| `pm.base`       | Base element styles (body, headings, links)              |
| `pm.components` | Component styles (`.pm-button`, `.pm-card`, etc.)        |
| `pm.utilities`  | Utility classes                                          |

### BEM Naming

```
.pm-<component>                    — Block
.pm-<component>--<modifier>        — Modifier
.pm-<component>__<element>         — Element (child)
```

### Three-Tier Token System

Tokens are organized into three tiers. Components reference **semantic** and **component** tokens — never primitives directly.

#### Tier 1: Primitive Tokens (in `@paramanu/tokens`)

Raw design values. Never used directly in component CSS.

```
--pm-color-primary-500: #3b82f6;     /* Color palette */
--pm-spacing-4: 16px;                /* Spacing scale */
--pm-radius-md: 6px;                 /* Border radius */
--pm-font-size-md: 1rem;             /* Typography */
--pm-shadow-md: 0 4px 6px ...;       /* Shadows */
--pm-transition-fast: 150ms;         /* Motion */
--pm-focus-ring-width: 2px;          /* Focus ring */
```

Source: `packages/tokens/src/tokens/primitive/*.json` (DTCG format)

#### Tier 2: Semantic Tokens (in `@paramanu/tokens`)

Purpose-driven tokens that reference primitives and carry light/dark values via `light-dark()`. **This is the primary layer components consume.**

```
/* Backgrounds */
--pm-bg: light-dark(var(--pm-color-neutral-0), var(--pm-color-neutral-950));
--pm-bg-subtle, --pm-bg-muted, --pm-bg-emphasis, --pm-bg-inverse

/* Foregrounds */
--pm-fg: light-dark(var(--pm-color-neutral-900), var(--pm-color-neutral-100));
--pm-fg-muted, --pm-fg-subtle, --pm-fg-emphasis, --pm-fg-inverse, --pm-fg-link

/* Borders */
--pm-border, --pm-border-muted, --pm-border-emphasis

/* Interactive: Primary */
--pm-primary, --pm-primary-hover, --pm-primary-active, --pm-primary-fg
--pm-primary-subtle, --pm-primary-subtle-hover, --pm-primary-border

/* Interactive: Neutral */
--pm-neutral, --pm-neutral-hover, --pm-neutral-active, --pm-neutral-fg
--pm-neutral-subtle, --pm-neutral-subtle-hover, --pm-neutral-border

/* Status: danger / success / warning / info (same pattern for each) */
--pm-{status}, --pm-{status}-hover, --pm-{status}-active, --pm-{status}-fg
--pm-{status}-subtle, --pm-{status}-subtle-fg, --pm-{status}-border

/* Focus & Overlay */
--pm-focus-ring, --pm-overlay-bg
```

Source: `packages/tokens/src/tokens/semantic/color.json` (DTCG with `$extensions.pm.lightDark`)

#### Tier 3: Component Tokens (in each `-js` package)

Component-specific CSS variables defined on the root element of each component. These reference semantic tokens (or primitives for non-color values like spacing/radius) and serve as the theming API for that component.

```css
.pm-btn {
  /* Component tokens — the theming surface */
  --pm-btn-bg: transparent;
  --pm-btn-color: inherit;
  --pm-btn-border-color: transparent;
  --pm-btn-radius: var(--pm-radius-md);
  --pm-btn-font-size: var(--pm-font-size-md);
  --pm-btn-padding-x: var(--pm-spacing-4);
  --pm-btn-padding-y: var(--pm-spacing-2);

  /* Consume component tokens in actual properties */
  background-color: var(--pm-btn-bg);
  color: var(--pm-btn-color);
  border-radius: var(--pm-btn-radius);
}

/* Variant overrides reference semantic tokens */
.pm-btn--primary {
  --pm-btn-bg: var(--pm-primary);
  --pm-btn-color: var(--pm-primary-fg);
  --pm-btn-hover-bg: var(--pm-primary-hover);
}
```

**Naming**: `--pm-<component>-<property>` (e.g., `--pm-btn-bg`, `--pm-alert-border-color`)

### Token Usage Rules

| Need             | Use                                     | NOT                                            |
| ---------------- | --------------------------------------- | ---------------------------------------------- |
| Background color | `var(--pm-bg)`, `var(--pm-primary)`     | `var(--pm-color-neutral-0)`                    |
| Text color       | `var(--pm-fg)`, `var(--pm-fg-muted)`    | `var(--pm-color-neutral-900)`                  |
| Border color     | `var(--pm-border)`                      | `var(--pm-color-neutral-300)`                  |
| Button bg        | `var(--pm-primary)`                     | `light-dark(var(--pm-color-primary-600), ...)` |
| Status color     | `var(--pm-danger)`, `var(--pm-success)` | `var(--pm-color-danger-600)`                   |
| Spacing          | `var(--pm-spacing-4)`                   | `16px`                                         |
| Radius           | `var(--pm-radius-md)`                   | `6px`                                          |
| Focus ring       | `var(--pm-focus-ring)`                  | `var(--pm-color-primary-500)`                  |

**Key rule**: Component CSS must NEVER use `light-dark()` with primitive token references. All light/dark adaptation is handled by semantic tokens. The only acceptable `light-dark()` in component CSS is for raw values in exceptional cases (e.g., theme-specific glow effects with `rgba()`).

### Dark Mode

Dark mode is automatic via `color-scheme: light dark` on `:root` and semantic tokens using `light-dark()`. Components do not need to write any dark mode code — semantic tokens handle it.

```css
/* CORRECT — automatic dark mode via semantic tokens */
.pm-card {
  background: var(--pm-bg);
  color: var(--pm-fg);
  border-color: var(--pm-border);
}

/* WRONG — manual light-dark() in component CSS */
.pm-card {
  background: light-dark(var(--pm-color-neutral-0), var(--pm-color-neutral-900));
}
```

Color scheme utility classes are available:

- `.pm-light` — forces light mode
- `.pm-dark` — forces dark mode
- `.pm-auto` — follows system preference (default)

### Focus Styles

Always use `:focus-visible` (not `:focus`) with the semantic focus-ring token:

```css
&:focus-visible {
  outline: var(--pm-focus-ring-width) solid var(--pm-focus-ring);
  outline-offset: var(--pm-focus-ring-offset);
}
```

### Transitions

Always specify individual properties, never `transition: all`:

```css
/* CORRECT */
transition-property: background-color, border-color, color, box-shadow;
transition-duration: var(--pm-transition-fast);
transition-timing-function: ease-in-out;

/* WRONG */
transition: all 150ms ease;
```

### Nesting vs Flat

- `*.css` files use CSS nesting (for BEM consumption)
- `*.module.css` files use flat selectors (CSS Modules requirement)

### CSS Build System

Each `-js` package has a `css.build.ts` that calls the shared utility from `tooling/css-build/`:

```typescript
import { buildCss } from "../../tooling/css-build/index.js"

buildCss({
  packageName: "buttons",
  packageDir: __dirname,
  components: ["button", "button-group", "close-button", ...],
})
```

Outputs per package:

- `dist/css/{package}.css` — all components combined
- `dist/css/{package}.min.css` — minified
- `dist/css/{component}.css` — per-component (tree-shakeable)
- `dist/css/{component}.module.css` + `.module.js` + `.module.d.ts` — CSS modules

Token CSS is **NOT** bundled into component CSS. Consumers import tokens separately:

```typescript
// Consumer must import tokens + component CSS
import "@paramanu/tokens/css/layer-order"
import "@paramanu/tokens/css/reset"
import "@paramanu/tokens/css"
import "@paramanu/buttons-js/css"
```

---

## 6. Cross-Package Reuse

When building a component, **always reuse existing class builders** from dependency packages rather than reimplementing:

| Need         | Use From        | Example                                             |
| ------------ | --------------- | --------------------------------------------------- |
| Layout       | `primitives-js` | `flexClasses()`, `stackClasses()`, `groupClasses()` |
| Text         | `typography-js` | `textClasses()`, `headingClasses()`                 |
| Close action | `buttons-js`    | `closeButtonClasses()`                              |
| Portal/Focus | `utilities-js`  | `Portal`, `FocusTrap`, `Presence`                   |

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
- Use per-component CSS imports (`@paramanu/buttons-js/css/button`) for minimal bundles

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

| Component  | Element                   |
| ---------- | ------------------------- |
| Button     | `<button>`                |
| Link       | `<a>`                     |
| Navigation | `<nav>`                   |
| Dialog     | `<dialog>`                |
| Input      | `<input>`                 |
| Checkbox   | `<input type="checkbox">` |
| Alert      | `<div role="alert">`      |
| Progress   | `<progress>`              |

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
