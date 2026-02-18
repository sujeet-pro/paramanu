---
description: Apply when working on theming, design tokens, CSS variables, component styling, or visual design decisions for the Paramanu design system. Auto-use when creating/modifying CSS files, token definitions, or theme configurations.
---

# Design System Guidelines

## Theming Architecture

### CSS Variables as the Foundation
All component styling MUST be controlled via CSS custom properties (variables) with the `--pm-` prefix. Components never use hardcoded color/spacing/typography values directly.

```css
/* CORRECT */
.pm-alert {
  padding: var(--pm-spacing-3) var(--pm-spacing-4);
  border-radius: var(--pm-radius-md);
  font-size: var(--pm-font-size-md);
}

/* WRONG - hardcoded values */
.pm-alert {
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 1rem;
}
```

### Default Theme (No Theme Class Required)
Without any theme applied, CSS variable defaults should produce a **minimalistic, typographic** look:
- System font stack (no web fonts required)
- Minimal borders and shadows
- Generous whitespace
- High contrast, readable text
- No decorative elements
- Colors derived from neutral palette with blue as primary accent

### Bundled Themes
The design system ships with 5 built-in themes. Each theme is a CSS file that overrides `--pm-*` variables:

1. **`pm-theme-dark-modern`** - Dark background, vibrant accents, subtle gradients, modern feel
2. **`pm-theme-light-modern`** - Clean white, refined shadows, modern rounded corners
3. **`pm-theme-antd`** - Ant Design inspired: `#1677ff` primary, 4px radius, specific shadows
4. **`pm-theme-material`** - Material Design inspired: elevation shadows, Roboto-oriented tokens, ripple-friendly spacing
5. **`pm-theme-bootstrap`** - Bootstrap inspired: `#0d6efd` primary, pill-shaped radius options, utility-friendly tokens

### Theme Application
```html
<!-- No theme = minimalistic/typographic default -->
<body>...</body>

<!-- Built-in theme -->
<body class="pm-theme-dark-modern">...</body>

<!-- Custom theme: just override --pm-* variables -->
<body class="my-custom-theme">...</body>
```

### Creating a Theme
A theme is just a CSS ruleset that overrides `--pm-*` variables:
```css
.my-theme {
  --pm-color-primary-500: #8b5cf6;
  --pm-color-primary-600: #7c3aed;
  --pm-radius-md: 12px;
  --pm-font-family-sans: "Inter", system-ui, sans-serif;
  /* ... override any token */
}
```

### Dark Mode Support
- Use CSS `light-dark()` function for properties that differ between light/dark
- Each theme defines `color-scheme: light` or `color-scheme: dark` (or `light dark` for auto)
- Components use `light-dark(lightValue, darkValue)` in their CSS

```css
.pm-card {
  background-color: light-dark(var(--pm-color-neutral-0), var(--pm-color-neutral-900));
  color: light-dark(var(--pm-color-neutral-900), var(--pm-color-neutral-50));
}
```

## CSS Architecture

### Layer Order
All CSS MUST be placed in the appropriate layer:
```css
@layer pm.reset, pm.tokens, pm.base, pm.components, pm.utilities;
```

- `pm.reset` - CSS reset/normalize
- `pm.tokens` - CSS custom property definitions
- `pm.base` - Base element styles (body, headings, links)
- `pm.components` - Component styles (`.pm-button`, `.pm-card`, etc.)
- `pm.utilities` - Utility classes

### Component CSS Rules
1. Always wrap in `@layer pm.components { ... }`
2. Use BEM naming: `.pm-<component>`, `.pm-<component>--<modifier>`, `.pm-<component>__<element>`
3. Use CSS nesting in the main `.css` file, flat selectors in `.module.css`
4. All visual properties must use `--pm-*` tokens
5. Transitions use `--pm-transition-*` tokens
6. Focus styles use `:focus-visible` with `--pm-focus-ring-*` tokens

### Token Categories
Source: `packages/tokens/src/tokens.json`

| Category | Variable Pattern | Examples |
|----------|-----------------|----------|
| Colors | `--pm-color-{palette}-{shade}` | `--pm-color-primary-500`, `--pm-color-neutral-200` |
| Spacing | `--pm-spacing-{scale}` | `--pm-spacing-1` (4px), `--pm-spacing-4` (16px) |
| Radius | `--pm-radius-{size}` | `--pm-radius-sm`, `--pm-radius-full` |
| Typography | `--pm-font-{property}-{value}` | `--pm-font-size-md`, `--pm-font-weight-bold` |
| Shadows | `--pm-shadow-{size}` | `--pm-shadow-sm`, `--pm-shadow-lg` |
| Transitions | `--pm-transition-{speed}` | `--pm-transition-fast` (150ms) |
| Focus | `--pm-focus-ring-{property}` | `--pm-focus-ring-width`, `--pm-focus-ring-offset` |

### Usage Modes
The design system supports three consumption modes:

1. **Headless (utilities only)** - Import `@paramanu/core` JS only, use class builder functions, bring your own CSS
2. **With built-in themes** - Import CSS + JS, apply a `pm-theme-*` class
3. **With custom themes** - Import CSS + JS, override `--pm-*` variables with your own values

### Adding New Tokens
1. Add to `packages/tokens/src/tokens.json` following the existing structure
2. Use `$value` for the value and `$type` for the token type
3. Run `pnpm build` in the tokens package
4. Use the generated `--pm-*` variable in component CSS

### Color Palettes
Each semantic color (primary, neutral, danger, success) has shades: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900. Neutral also has 0 (white) and 950 (near-black). When adding new semantic colors (warning, info, etc.), follow the same shade scale.
