# Cross-Component Consistency Review Guidelines

Apply when reviewing components for consistency across the design system, auditing prop naming, ensuring patterns are uniform, or when asked to "review all" components.

---

## 1. Purpose

Consistency is critical for design system DX. Consumers should be able to predict how a component works based on their experience with other components. This guideline defines what "consistent" means in Paramanu and provides a systematic review checklist.

---

## 2. Prop Naming Consistency

### Universal Props

These props MUST use the exact same name and type across ALL components that support them:

| Prop | Type | Meaning | Used By |
|------|------|---------|---------|
| `variant` | Component-specific union | Visual style variation | All visible components |
| `size` | `"sm" \| "md" \| "lg"` | Component size scale | All sized components |
| `disabled` | `boolean` | Disabled state | All interactive components |
| `fullWidth` | `boolean` | Stretch to container width | Button, Input, Select, etc. |
| `orientation` | `"horizontal" \| "vertical"` | Layout direction | ButtonGroup, Tabs, Stack, etc. |
| `className` | `string` | Additional CSS classes (React) | All React components |

### Forbidden Aliases

Never use these alternative names — they break consistency:

| WRONG | CORRECT |
|-------|---------|
| `type` (for visual style) | `variant` |
| `kind` | `variant` |
| `appearance` | `variant` |
| `scale` / `dimension` | `size` |
| `isDisabled` | `disabled` |
| `block` / `fluid` | `fullWidth` |
| `direction` (for layout) | `orientation` |
| `color` (for semantic variants) | `variant` |

### Variant Naming Patterns

Semantic variant names should be consistent across components:

| Variant Name | Meaning | Components |
|---|---|---|
| `"primary"` | High emphasis, main action | Button, Badge, Alert |
| `"secondary"` | Medium emphasis, supporting | Button, Badge |
| `"danger"` | Destructive / error | Button, Alert, Badge |
| `"ghost"` | Minimal emphasis | Button, IconButton |
| `"info"` | Informational | Alert, Toast, Banner |
| `"success"` | Positive outcome | Alert, Toast, Badge |
| `"warning"` | Caution | Alert, Toast, Banner |

### Size Scale

All components use the same 3-level size scale:

| Size | Token Reference | Typical Use |
|---|---|---|
| `"sm"` | Compact density | Tables, toolbars, dense UI |
| `"md"` | Default density | Standard forms and content |
| `"lg"` | Spacious density | Hero sections, touch targets |

Some components may extend this with `"xs"` or `"xl"` only when there is a clear need documented across 4+ reference design systems.

---

## 3. Structural Consistency

### Type File Pattern

Every component's types file MUST follow this structure:

```typescript
// 1. Variant type (if applicable)
export type <Component>Variant = "..." | "..."

// 2. Size type (if applicable)
export type <Component>Size = "sm" | "md" | "lg"

// 3. ClassesOptions interface (for class builders)
export interface <Component>ClassesOptions {
  variant?: <Component>Variant
  size?: <Component>Size
  // boolean modifiers
}

// 4. Props interface (extends ClassesOptions)
export interface <Component>Props extends <Component>ClassesOptions {
  // non-visual props (events, refs, behavioral flags)
}
```

### Class Builder Pattern

Every class builder MUST:
1. Accept a single options object with all fields optional
2. Return a space-separated string of BEM classes
3. Start with the base class (`pm-<component>`)
4. Default to the most common variant and `"md"` size
5. Export both `<component>Classes()` and `<component>ModuleClasses()`

### React Component Pattern

Every React component MUST:
1. Use `forwardRef` with named function (not arrow)
2. Extend the HTML element's attributes (via `React.HTMLAttributes<...>`)
3. Accept `className` and merge it with generated classes
4. Spread `...rest` onto the DOM element
5. Call the `-js` package's class builder for class generation

---

## 4. CSS Consistency

### Variable Naming

Component-specific CSS variables follow:

```
--pm-<component>-<property>
--pm-<component>-<variant>-<property>
--pm-<component>-<size>-<property>
```

Examples:
```css
--pm-button-padding-x
--pm-button-primary-bg
--pm-button-sm-font-size
--pm-alert-border-width
--pm-alert-danger-bg
```

### State Pseudo-classes

Use consistent pseudo-class ordering in CSS:

```css
.pm-component {
  /* Base styles */

  &:hover { ... }
  &:active { ... }
  &:focus-visible { ... }
  &.pm-component--disabled { ... }
}
```

### Transition Properties

All interactive state transitions use the same pattern:

```css
transition:
  background-color var(--pm-transition-fast),
  color var(--pm-transition-fast),
  border-color var(--pm-transition-fast),
  box-shadow var(--pm-transition-fast);
```

---

## 5. Review Checklist

When reviewing a component (or all components), verify each of these:

### Naming
- [ ] `variant` prop name used (not `type`, `kind`, `appearance`)
- [ ] `size` prop name used (not `scale`, `dimension`)
- [ ] `disabled` prop name used (not `isDisabled`)
- [ ] `fullWidth` prop name used (not `block`, `fluid`)
- [ ] Variant values match the standard semantic names
- [ ] Size values are `"sm" | "md" | "lg"` (with `"md"` default)

### Types
- [ ] `<Component>Variant` type exported
- [ ] `<Component>Size` type exported
- [ ] `<Component>ClassesOptions` interface exported
- [ ] `<Component>Props` interface extends `ClassesOptions`
- [ ] All props have JSDoc with `@default` tags

### Class Builders
- [ ] `<component>Classes()` function exported
- [ ] `<component>ModuleClasses()` function exported
- [ ] Default returns base class + default variant + default size
- [ ] Options object is fully optional (no required fields)
- [ ] Class string starts with base class

### CSS
- [ ] Wrapped in `@layer pm.components`
- [ ] All values use `--pm-*` tokens (no hardcoded values)
- [ ] `:focus-visible` used (not `:focus`)
- [ ] Transitions on specific properties (not `all`)
- [ ] Component-specific variables follow `--pm-<component>-*` pattern
- [ ] Dark mode via `light-dark()` where applicable

### React
- [ ] `forwardRef` with named function
- [ ] `className` merged correctly
- [ ] `...rest` spread on DOM element
- [ ] `type="button"` default for button elements
- [ ] `disabled` + `aria-disabled` for disabled state

### Accessibility
- [ ] Semantic HTML element used
- [ ] ARIA attributes present where needed
- [ ] Keyboard navigation works
- [ ] Focus ring visible on keyboard focus
- [ ] Screen reader announces correctly

### Tests
- [ ] Unit tests cover all variants, sizes, modifiers
- [ ] A11y tests verify semantic element and ARIA
- [ ] React tests cover rendering, props, ref, className, disabled
- [ ] Play function interaction tests in stories

### Stories
- [ ] Playground story with all controls
- [ ] Story per variant, per size, per modifier
- [ ] Matrix story (variant x size)
- [ ] Composition stories
- [ ] Edge case stories
- [ ] autodocs enabled

### Documentation
- [ ] Usage tab complete (imports, examples, all variants/sizes/states)
- [ ] Guidelines tab complete (a11y, performance, design)
- [ ] API tab complete (props from JSDoc, CSS variables, CSS classes)

---

## 6. Common Inconsistencies to Watch For

| Issue | Example | Fix |
|---|---|---|
| Mixed prop naming | `Alert` uses `type` while `Badge` uses `variant` | Standardize to `variant` |
| Inconsistent defaults | `Button` defaults to `"md"` but `Input` defaults to `"lg"` | All default to `"md"` |
| Missing disabled ARIA | Component sets `disabled` but not `aria-disabled` | Add both |
| Hardcoded CSS values | `border-radius: 4px` instead of `var(--pm-radius-sm)` | Use tokens |
| `:focus` instead of `:focus-visible` | `:focus { outline: ... }` | Change to `:focus-visible` |
| `transition: all` | `transition: all 150ms` | List specific properties |
| Default export | `export default Button` | Use named export |
| Missing forwardRef | `function Button(props)` | Wrap with `forwardRef` |
| Generic className handling | `className={classes}` ignoring user className | Merge: `${classes} ${className}` |
| Arrow function in forwardRef | `forwardRef((props, ref) => ...)` | Use named function |

---

## 7. Running a Full Review

When asked to "review all" or check consistency:

1. **List all implemented components** — Check which packages have components vs empty scaffolds
2. **For each implemented component**, run through the full checklist above
3. **Compare across components** — Ensure the same prop means the same thing everywhere
4. **Report inconsistencies** — Create a table of findings with component, issue, and suggested fix
5. **Prioritize fixes** — Group by severity: naming (high), behavior (high), CSS (medium), docs (low)
