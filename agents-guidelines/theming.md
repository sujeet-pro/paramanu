# Theming Guidelines

Apply when working on themes, design tokens, CSS variables, dark mode support, or visual design decisions.

---

## 1. CSS Variables Foundation

All component styling MUST be controlled via CSS custom properties with the `--pm-` prefix. Components never use hardcoded values.

```css
/* CORRECT */
.pm-alert {
  padding: var(--pm-spacing-3) var(--pm-spacing-4);
  border-radius: var(--pm-radius-md);
  font-size: var(--pm-font-size-md);
}

/* WRONG — hardcoded values */
.pm-alert {
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 1rem;
}
```

---

## 2. Default Theme (No Theme Class Required)

Without any theme class applied, CSS variable defaults produce a **minimalistic, typographic** look:

- System font stack (no web fonts required)
- Minimal borders and shadows
- Generous whitespace
- High contrast, readable text
- No decorative elements
- Colors derived from neutral palette with blue as primary accent

---

## 3. Pre-Built Themes

The design system ships with **5 built-in themes**. Each theme is a CSS file that overrides `--pm-*` variables.

| Theme Class | Description | Primary Color | Key Characteristics |
|---|---|---|---|
| `pm-theme-dark-modern` | Dark background, vibrant accents | Vibrant blue | Subtle gradients, glow effects, dark surfaces |
| `pm-theme-light-modern` | Clean white, refined shadows | Soft blue | Modern rounded corners, elevated shadows |
| `pm-theme-antd` | Ant Design inspired | `#1677ff` | 4px radius, specific shadow scale, compact density |
| `pm-theme-material` | Material Design inspired | `#6750A4` | Elevation shadows, Roboto-oriented tokens, ripple-friendly |
| `pm-theme-bootstrap` | Bootstrap inspired | `#0d6efd` | Pill-shaped radius options, utility-friendly tokens |

### Theme Application

```html
<!-- No theme = minimalistic/typographic default -->
<body>...</body>

<!-- Built-in theme -->
<body class="pm-theme-dark-modern">...</body>

<!-- Custom theme: override --pm-* variables -->
<body class="my-custom-theme">...</body>
```

### Theme File Structure

Each theme is a single CSS file in `packages/tokens/src/themes/`:

```
packages/tokens/src/themes/
  dark-modern.css
  light-modern.css
  antd.css
  material.css
  bootstrap.css
```

---

## 4. Theme Completeness Requirement

**Every pre-built theme MUST support every component in the design system.**

When a new component is added or modified:

1. **Check all 5 themes** — Verify the component renders correctly in every theme
2. **Add component-specific overrides** — If the component introduces new `--pm-*` variables, add appropriate overrides in each theme file
3. **Test visual consistency** — Each theme should feel cohesive (a Material-themed Alert should feel like it belongs in a Material-themed app)
4. **Dark mode support** — Both the default theme and all 5 pre-built themes must work with `prefers-color-scheme: dark` via `light-dark()` usage

### Theme Update Checklist (per component)

When implementing or modifying a component, update themes as follows:

- [ ] Default theme: Component looks good with no theme class
- [ ] `dark-modern`: Dark surface, vibrant accent colors, subtle glow on focus
- [ ] `light-modern`: Light surface, refined shadows, modern radius
- [ ] `antd`: Matches Ant Design look (compact, 4px radius, specific colors)
- [ ] `material`: Matches Material Design look (elevation, specific typography)
- [ ] `bootstrap`: Matches Bootstrap look (specific primary blue, pill options)
- [ ] Dark mode: `light-dark()` values correct in all themes
- [ ] Storybook: Verified in theme switcher (all 5 themes + custom)

### Component-Specific Theme Variables

When a component introduces new CSS variables, each theme must provide overrides:

```css
/* default (no theme class) — in the component CSS */
.pm-alert {
  --pm-alert-bg: light-dark(var(--pm-color-neutral-50), var(--pm-color-neutral-800));
  --pm-alert-border-color: light-dark(var(--pm-color-neutral-200), var(--pm-color-neutral-700));
  --pm-alert-border-radius: var(--pm-radius-md);
}

/* dark-modern theme override */
.pm-theme-dark-modern .pm-alert {
  --pm-alert-bg: var(--pm-color-neutral-900);
  --pm-alert-border-color: var(--pm-color-neutral-700);
}

/* antd theme override */
.pm-theme-antd .pm-alert {
  --pm-alert-border-radius: 4px;
}
```

---

## 5. Dark Mode

Use CSS `light-dark()` function for properties that differ between light and dark:

```css
.pm-card {
  background-color: light-dark(var(--pm-color-neutral-0), var(--pm-color-neutral-900));
  color: light-dark(var(--pm-color-neutral-900), var(--pm-color-neutral-50));
}
```

Each theme sets `color-scheme`:
- `color-scheme: light` — Light-only theme
- `color-scheme: dark` — Dark-only theme
- `color-scheme: light dark` — Automatic based on user preference

---

## 6. CSS Architecture

### Layer Order

```css
@layer pm.reset, pm.tokens, pm.base, pm.components, pm.utilities;
```

| Layer | Purpose |
|---|---|
| `pm.reset` | CSS reset/normalize |
| `pm.tokens` | CSS custom property definitions |
| `pm.base` | Base element styles (body, headings, links) |
| `pm.components` | Component styles (`.pm-button`, `.pm-card`, etc.) |
| `pm.utilities` | Utility classes |

### Component CSS Rules

1. Always wrap in `@layer pm.components { ... }`
2. BEM naming: `.pm-<component>`, `.pm-<component>--<modifier>`, `.pm-<component>__<element>`
3. CSS nesting in `.css`, flat selectors in `.module.css`
4. All visual properties use `--pm-*` tokens
5. Transitions use `--pm-transition-*` tokens
6. Focus styles use `:focus-visible` with `--pm-focus-ring-*` tokens

### Token Categories

Source: `packages/tokens/src/tokens.json`

| Category | Variable Pattern | Examples |
|---|---|---|
| Colors | `--pm-color-{palette}-{shade}` | `--pm-color-primary-500`, `--pm-color-neutral-200` |
| Spacing | `--pm-spacing-{scale}` | `--pm-spacing-1` (4px), `--pm-spacing-4` (16px) |
| Radius | `--pm-radius-{size}` | `--pm-radius-sm`, `--pm-radius-full` |
| Typography | `--pm-font-{property}-{value}` | `--pm-font-size-md`, `--pm-font-weight-bold` |
| Shadows | `--pm-shadow-{size}` | `--pm-shadow-sm`, `--pm-shadow-lg` |
| Transitions | `--pm-transition-{speed}` | `--pm-transition-fast` (150ms) |
| Focus | `--pm-focus-ring-{property}` | `--pm-focus-ring-width`, `--pm-focus-ring-offset` |

---

## 7. Creating a Custom Theme

A theme is a CSS ruleset that overrides `--pm-*` variables:

```css
.my-theme {
  --pm-color-primary-500: #8b5cf6;
  --pm-color-primary-600: #7c3aed;
  --pm-radius-md: 12px;
  --pm-font-family-sans: "Inter", system-ui, sans-serif;
  /* override any token */
}
```

### Consumption Modes

1. **Headless (class builders only)** — Import JS only, bring your own CSS
2. **With built-in themes** — Import CSS + JS, apply a `pm-theme-*` class
3. **With custom themes** — Import CSS + JS, override `--pm-*` variables

---

## 8. Storybook Theme Switcher

Both React and vanilla Storybooks MUST include a **global theme switcher** in the toolbar.

### Switcher Options

| Option | Theme Class Applied | Source |
|---|---|---|
| Default | *(none)* | Built-in minimalistic theme |
| Dark Modern | `pm-theme-dark-modern` | `@paramanu/tokens/css/themes/dark-modern` |
| Light Modern | `pm-theme-light-modern` | `@paramanu/tokens/css/themes/light-modern` |
| Ant Design | `pm-theme-antd` | `@paramanu/tokens/css/themes/antd` |
| Material | `pm-theme-material` | `@paramanu/tokens/css/themes/material` |
| Bootstrap | `pm-theme-bootstrap` | `@paramanu/tokens/css/themes/bootstrap` |
| Custom | `pm-theme-custom` | Local to Storybook (`.storybook/custom-theme.css`) |

### Implementation in `preview.ts`

```typescript
// Import all theme CSS
import "@paramanu/tokens/css"
import "@paramanu/tokens/css/themes/dark-modern"
import "@paramanu/tokens/css/themes/light-modern"
import "@paramanu/tokens/css/themes/antd"
import "@paramanu/tokens/css/themes/material"
import "@paramanu/tokens/css/themes/bootstrap"
import "./custom-theme.css"

// Import component CSS
import "@paramanu/buttons-js/css"
// ... add more as packages are implemented

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme switcher",
    defaultValue: "",
    toolbar: {
      icon: "paintbrush",
      title: "Theme",
      items: [
        { value: "", title: "Default (Minimalistic)" },
        { value: "pm-theme-dark-modern", title: "Dark Modern" },
        { value: "pm-theme-light-modern", title: "Light Modern" },
        { value: "pm-theme-antd", title: "Ant Design" },
        { value: "pm-theme-material", title: "Material" },
        { value: "pm-theme-bootstrap", title: "Bootstrap" },
        { value: "pm-theme-custom", title: "Custom" },
      ],
      dynamicTitle: true,
    },
  },
}
```

### Theme Decorator (React)

```typescript
export const decorators = [
  (Story, context) => {
    const theme = context.globals.theme || ""
    return (
      <div className={theme} style={{ padding: "1rem" }}>
        <Story />
      </div>
    )
  },
]
```

### Theme Decorator (Vanilla)

```typescript
export const decorators = [
  (story, context) => {
    const theme = context.globals.theme || ""
    const wrapper = document.createElement("div")
    wrapper.className = theme
    wrapper.style.padding = "1rem"
    const content = story()
    if (typeof content === "string") {
      wrapper.innerHTML = content
    } else {
      wrapper.appendChild(content)
    }
    return wrapper
  },
]
```

### Custom Theme File

Create `.storybook/custom-theme.css` in both Storybook apps:

```css
.pm-theme-custom {
  color-scheme: light;

  /* Override tokens to preview custom theming */
  --pm-color-primary-500: #8b5cf6;
  --pm-color-primary-600: #7c3aed;
  --pm-color-primary-700: #6d28d9;
  --pm-radius-sm: 4px;
  --pm-radius-md: 8px;
  --pm-radius-lg: 16px;
  --pm-font-family-sans: "Inter", system-ui, sans-serif;

  /* Developers can edit this file to preview their own theme */
}
```
