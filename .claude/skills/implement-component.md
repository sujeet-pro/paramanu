---
description: Apply when implementing a new component in the Paramanu design system, adding a component to packages/core or packages/react, or when the user asks to build/create/add a component. Auto-use for component implementation tasks.
---

# Implement Component

Follow this end-to-end workflow when implementing a new Paramanu design system component.

## Phase 0: Determine Package Placement

Check `components-list.md` to identify which package group the component belongs to. Components in the same group share a package. Currently, all components go into:
- `packages/core/` - Framework-agnostic (JS class builders + CSS)
- `packages/react/` - React wrappers

Within each package, components are organized in subdirectories: `src/<component-name>/`

If the component belongs to a new package group (e.g., `@paramanu/forms`), create the package first:
1. Create `packages/<package-name>/package.json` following existing patterns
2. Add to `tsconfig.json` references
3. Add build configuration

## Phase 1: Research (Use component-research skill)

Before writing any code:
1. Research the component across popular design systems
2. Finalize the API design
3. Document accessibility requirements
4. Get user approval on the proposed API and feature set

## Phase 2: Implement Core (packages/core)

### 2a. Types File - `src/<component>/<component>.types.ts`
```typescript
export type <Component>Variant = "..." | "..."
export type <Component>Size = "sm" | "md" | "lg"

export interface <Component>ClassesOptions {
  variant?: <Component>Variant
  size?: <Component>Size
  // boolean modifiers
}

export interface <Component>Props extends <Component>ClassesOptions {
  // non-visual props
}
```

### 2b. Classes File - `src/<component>/<component>.classes.ts`
```typescript
import type { <Component>ClassesOptions } from "./<component>.types.js"

const BASE = "pm-<component>"

export function <component>Classes(options: <Component>ClassesOptions = {}): string {
  const { variant = "default", size = "md", ...modifiers } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`]
  // Add boolean modifier classes
  return classes.join(" ")
}

export function <component>ModuleClasses(
  classMap: Record<string, string>,
  options: <Component>ClassesOptions = {},
): string {
  // Same logic but using classMap lookups
}
```

### 2c. CSS File - `src/<component>/<component>.css`
```css
@layer pm.components {
  .pm-<component> {
    /* Base styles using --pm-* tokens */

    &:focus-visible {
      outline: var(--pm-focus-ring-width) solid var(--pm-color-primary-500);
      outline-offset: var(--pm-focus-ring-offset);
    }

    /* Variants */
    &.pm-<component>--<variant> { ... }

    /* Sizes */
    &.pm-<component>--sm { ... }
    &.pm-<component>--md { ... }
    &.pm-<component>--lg { ... }

    /* States */
    &.pm-<component>--disabled { ... }
  }
}
```

### 2d. CSS Module File - `src/<component>/<component>.module.css`
Same styles as `.css` but with flat selectors (no nesting). CSS modules require classes to be at the top level for proper hashing.

### 2e. Export from Package
Add to `packages/core/src/index.ts`:
```typescript
export { <component>Classes, <component>ModuleClasses } from "./<component>/<component>.classes.js"
export type { <Component>Variant, <Component>Size, <Component>ClassesOptions, <Component>Props } from "./<component>/<component>.types.js"
```

## Phase 3: Implement React (packages/react)

### 3a. React Component - `src/<component>/<component>.tsx`
```typescript
import { forwardRef } from "react"
import { <component>Classes } from "@paramanu/core"
import type { <Component>Props } from "@paramanu/core"

export interface React<Component>Props
  extends <Component>Props,
    Omit<React.<Element>HTMLAttributes<HTML<Element>Element>, "conflicting-keys"> {
  children?: React.ReactNode
}

export const <Component> = forwardRef<HTML<Element>Element, React<Component>Props>(
  function <Component>({ variant, size, className, children, ...rest }, ref) {
    const classes = <component>Classes({ variant, size })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <<element> ref={ref} className={combinedClassName} {...rest}>
        {children}
      </<element>>
    )
  },
)
```

### 3b. Export from Package
Add to `packages/react/src/index.ts`:
```typescript
export { <Component> } from "./<component>/<component>.js"
export type { React<Component>Props } from "./<component>/<component>.js"
```

## Phase 4: Tests

### 4a. Unit Tests - `packages/core/src/<component>/<component>.test.ts`
Test the class builder functions:
- Default classes
- Each variant
- Each size
- Boolean modifiers
- Combined options
- Module classes with mock classMap

### 4b. Accessibility Tests - `packages/core/src/<component>/<component>.a11y.test.ts`
Test with JSDOM:
- Correct semantic element
- ARIA attributes present
- Disabled state handling
- Screen reader text

### 4c. React Tests - `packages/react/src/<component>/<component>.test.tsx`
Test with @testing-library/react:
- Renders with text content
- Applies correct classes
- Variant/size/modifier props
- Forwards ref
- Merges custom className
- Passes through HTML attributes
- Keyboard interaction (for interactive components)
- Disabled state

## Phase 5: Storybook Stories

### 5a. Vanilla Stories - `apps/storybook-vanilla/src/stories/<component>.stories.ts`
- Import from `@paramanu/core`
- Create elements with `document.createElement`
- Add story for each variant, size, and state
- Use `argTypes` with controls for all props

### 5b. React Stories - `apps/storybook-react/src/stories/<component>.stories.tsx`
- Import from `@paramanu/react`
- Use `component` meta property for auto-docs
- Add story for each variant, size, and state
- Use `argTypes` with controls for all props

## Phase 6: Documentation

### 6a. Create Doc Page (Use component-docs skill)
Create `apps/docs/src/content/docs/components/<group>/<component>.mdx` with:
- Usage tab (examples, when to use)
- Guidelines tab (accessibility, performance, design)
- API tab (props, CSS variables, classes)

## Phase 7: Verify

Run verification:
```bash
pnpm build          # All packages build successfully
pnpm test           # All tests pass
pnpm typecheck      # No type errors
pnpm lint           # No lint errors
```

## Checklist

Before marking a component as done:
- [ ] Types defined in `*.types.ts`
- [ ] Class builders in `*.classes.ts` with BEM + module variants
- [ ] CSS in `*.css` (nested) and `*.module.css` (flat)
- [ ] All styles use `--pm-*` CSS custom properties
- [ ] Component wrapped in `@layer pm.components`
- [ ] React component with `forwardRef`
- [ ] Semantic HTML element used
- [ ] `:focus-visible` styles for keyboard users
- [ ] `aria-disabled` for disabled states
- [ ] Unit tests for class builders
- [ ] Accessibility tests with JSDOM
- [ ] React tests with @testing-library
- [ ] Vanilla Storybook story
- [ ] React Storybook story
- [ ] Documentation page with Usage, Guidelines, API tabs
- [ ] Exported from package index
- [ ] All builds pass
- [ ] All tests pass
