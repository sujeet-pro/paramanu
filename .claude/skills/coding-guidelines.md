---
description: Apply when writing or modifying any TypeScript, TSX, CSS, or configuration files in the Paramanu design system. Auto-use for all code changes including components, tests, utilities, and build scripts.
---

# Coding Guidelines

## TypeScript

### Strict Mode
All TypeScript code must be strictly typed. No `any` types unless absolutely unavoidable (and annotated with a comment explaining why).

```typescript
// CORRECT
function buttonClasses(options: ButtonClassesOptions = {}): string { ... }

// WRONG
function buttonClasses(options: any): string { ... }
```

### Type Exports
- Export types from dedicated `*.types.ts` files
- Use `export type` for type-only exports
- Keep interfaces and types in the same file as the component they serve
- Use `interface` for object shapes, `type` for unions/aliases

### Module System
- All packages use `"type": "module"` (ESM only)
- Use `.js` extension in imports even for TypeScript files: `import { foo } from "./foo.js"`
- Use `import type` for type-only imports

## File Naming Convention

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

## Performance

### CSS Performance
- Use CSS containment (`contain`) where appropriate for complex components
- Prefer CSS-only solutions over JavaScript for visual states (`:hover`, `:focus`, etc.)
- Minimize CSS specificity - rely on layers, not selector weight
- Use `will-change` sparingly and only when proven necessary
- Transitions only on specific properties, never `transition: all`

### JavaScript Performance
- Class builder functions must be pure and allocation-minimal
- Avoid unnecessary array/object allocations in hot paths
- React components: use `forwardRef`, avoid inline objects in render
- Memoize only when profiling proves it's needed (don't premature-optimize)

### Bundle Size
- Every export from `@paramanu/core` and `@paramanu/react` must be tree-shakeable
- No side effects in module scope (or declare in package.json `sideEffects`)
- CSS is separate from JS - consumers import what they need

## Accessibility (WCAG 2.2 AA)

### Required for Every Component
1. **Semantic HTML** - Use correct elements (`<button>`, `<nav>`, `<dialog>`, `<input>`, etc.). Never use `<div>` or `<span>` for interactive elements.
2. **Keyboard Navigation** - All interactive components must be fully operable via keyboard
3. **Focus Management** - Use `:focus-visible` for focus rings. Trap focus in modals/dialogs.
4. **ARIA Attributes** - Add `aria-*` attributes where semantic HTML is insufficient
5. **Color Contrast** - All text must meet 4.5:1 contrast ratio (3:1 for large text)
6. **Screen Reader Support** - Provide `aria-label`, `aria-describedby`, `aria-live` as needed
7. **Reduced Motion** - Respect `prefers-reduced-motion` media query

### Specific Patterns
```typescript
// Disabled state: use BOTH disabled attribute and aria-disabled
<button disabled aria-disabled={disabled || undefined}>

// Icon-only buttons: require aria-label
<button aria-label="Close dialog"><IconX /></button>

// Dynamic content: use aria-live for status updates
<div role="status" aria-live="polite">{statusMessage}</div>
```

### Testing Accessibility
Every component MUST have:
1. Unit tests verifying correct semantic elements and ARIA attributes (`*.a11y.test.ts`)
2. Axe-core integration tests in Storybook via `@storybook/addon-a11y`
3. Keyboard navigation tests for interactive components

## Semantic HTML

Always use the most semantically appropriate element:

| Component | Element(s) |
|-----------|-----------|
| Button | `<button>` |
| Link | `<a>` |
| Navigation | `<nav>` |
| Dialog/Modal | `<dialog>` |
| Text Input | `<input>` |
| Textarea | `<textarea>` |
| Select | `<select>` |
| Checkbox | `<input type="checkbox">` |
| Radio | `<input type="radio">` |
| List | `<ul>`, `<ol>`, `<li>` |
| Table | `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` |
| Heading | `<h1>` through `<h6>` |
| Section | `<section>`, `<article>`, `<aside>`, `<header>`, `<footer>` |
| Alert | `<div role="alert">` |
| Progress | `<progress>` |
| Meter | `<meter>` |

## Configuration

### JSON5 for Authoring
When configuration files need to be authored by developers (not machine-generated), use JSON5:
- Allows comments, trailing commas, unquoted keys
- File extension: `.json5`
- During build, convert to plain JSON objects in code

### Package Configuration
- `tsup` for library bundling
- `tsx` for build scripts
- `vitest` for testing
- `lightningcss` for CSS processing
- `style-dictionary` for token generation

## Code Style (Prettier)
- No semicolons
- Double quotes
- Trailing commas (all)
- 100 character print width
- 2-space indentation
- LF line endings
