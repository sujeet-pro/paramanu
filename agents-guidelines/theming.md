# Theming Guidelines

Apply when working on themes, design tokens, CSS variables, dark mode support, or visual design decisions.

---

## 1. Token Architecture

The design system uses a **three-tier token system** built on DTCG (Design Token Community Group) format. Tokens are authored as JSON and compiled to CSS custom properties, JS exports, and `@property` declarations.

### Token Tiers

```
Tier 1: Primitive Tokens     — Raw values (colors, spacing, radii, typography, shadows, motion)
Tier 2: Semantic Tokens       — Purpose-driven (bg, fg, border, interactive states)
Tier 3: Component Tokens      — Per-component theming surface (--pm-btn-bg, --pm-alert-radius)
```

### Where Tokens Live

| Tier | Location | Output |
|---|---|---|
| Primitive | `packages/tokens/src/tokens/primitive/*.json` | `@paramanu/tokens/css/primitives` |
| Semantic | `packages/tokens/src/tokens/semantic/*.json` | `@paramanu/tokens/css/semantic` |
| Combined | (built from both) | `@paramanu/tokens/css` |
| Theme overrides | `packages/tokens/src/tokens/themes/<name>/*.json` | `@paramanu/tokens/css/themes/<name>` |
| Component | `packages/<group>-js/src/<component>/<component>.css` | `@paramanu/<group>-js/css` |

### Build Pipeline

```
tokens/primitive/*.json + tokens/semantic/*.json
  ↓  (packages/tokens/src/build.ts)
  ├── dist/css/primitives.css      — Primitive custom properties
  ├── dist/css/semantic.css        — Semantic custom properties with light-dark()
  ├── dist/css/tokens.css          — Combined (primitives + semantics) in @layer pm.tokens
  ├── dist/css/properties.css      — @property declarations for typed transitions
  ├── dist/css/reset.css           — CSS reset
  ├── dist/css/layers.css          — @layer order declaration
  ├── dist/css/theme-*.css         — Per-theme override files
  ├── dist/css/themes.css          — Barrel importing all themes
  ├── dist/js/tokens.js            — JS object of all token values
  └── dist/js/tokens.d.ts          — TypeScript declarations
```

---

## 2. Primitive Tokens (Tier 1)

Raw design values authored in DTCG format with `$type` inheritance. These provide the palette that semantic tokens reference.

### File Structure

```
packages/tokens/src/tokens/primitive/
  color.json        — 6 palettes × 10-12 shades (primary, neutral, danger, success, warning, info)
  spacing.json      — 0-16 scale (0, 05, 1, 15, 2, 3, 4, 5, 6, 8, 10, 12, 16)
  radius.json       — none, sm, md, lg, xl, full
  typography.json   — font-family, font-size, font-weight, font-lineHeight
  shadow.json       — xs, sm, md, lg
  motion.json       — transition-fast, transition-normal, transition-slow
  focus.json        — focus-ring-width, focus-ring-offset
```

### DTCG Format

```json
{
  "color": {
    "$type": "color",
    "primary": {
      "50": { "$value": "#eff6ff" },
      "500": { "$value": "#3b82f6" },
      "900": { "$value": "#1e3a8a" }
    }
  }
}
```

- `$type` is inherited by children — set it on the group, not each token
- `$value` holds the raw value
- Token path maps to CSS variable name: `color.primary.500` → `--pm-color-primary-500`

### CSS Output

```css
@layer pm.tokens {
  :root {
    --pm-color-primary-500: #3b82f6;
    --pm-spacing-4: 16px;
    --pm-radius-md: 6px;
    /* ... 106 primitive tokens total */
  }
}
```

### `@property` Declarations

Typed custom property declarations enable CSS transitions on token values:

```css
@property --pm-color-primary-500 {
  syntax: "<color>";
  inherits: true;
  initial-value: #3b82f6;
}
@property --pm-spacing-4 {
  syntax: "<length>";
  inherits: false;
  initial-value: 16px;
}
```

Type mapping: `color` → `<color>`, `dimension` (px) → `<length>`, `number` → `<number>`, `duration` → `<time>`. Rem/em values and complex types (shadows, font-family) use `syntax: "*"`.

Import `@paramanu/tokens/css/properties` to enable smooth token transitions on theme switch.

---

## 3. Semantic Tokens (Tier 2)

Purpose-driven tokens that carry light AND dark values via `$extensions.pm.lightDark`. The build script outputs them as CSS `light-dark()`.

### DTCG Format with lightDark Extension

```json
{
  "bg": {
    "$type": "color",
    "$value": "{color.neutral.0}",
    "$extensions": {
      "pm.lightDark": {
        "light": "{color.neutral.0}",
        "dark": "{color.neutral.950}"
      }
    }
  }
}
```

### CSS Output

```css
--pm-bg: light-dark(var(--pm-color-neutral-0), var(--pm-color-neutral-950));
```

### Complete Semantic Token Reference

**Backgrounds**

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--pm-bg` | neutral.0 | neutral.950 | Page/body background |
| `--pm-bg-subtle` | neutral.50 | neutral.900 | Offset surface (sidebar, card hover) |
| `--pm-bg-muted` | neutral.100 | neutral.800 | Code blocks, disabled inputs |
| `--pm-bg-emphasis` | neutral.800 | neutral.100 | Tooltips, dark overlays |
| `--pm-bg-inverse` | neutral.900 | neutral.50 | Inverse surface |

**Foregrounds**

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--pm-fg` | neutral.900 | neutral.100 | Primary text |
| `--pm-fg-muted` | neutral.600 | neutral.400 | Secondary text |
| `--pm-fg-subtle` | neutral.400 | neutral.500 | Placeholders, hints |
| `--pm-fg-emphasis` | neutral.950 | neutral.0 | High-emphasis text |
| `--pm-fg-inverse` | neutral.0 | neutral.950 | Text on emphasis/inverse bg |
| `--pm-fg-link` | primary.600 | primary.400 | Link text |
| `--pm-fg-link-hover` | primary.700 | primary.300 | Link hover |

**Borders**

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--pm-border` | neutral.300 | neutral.600 | Default border |
| `--pm-border-muted` | neutral.200 | neutral.700 | Subtle dividers |
| `--pm-border-emphasis` | neutral.400 | neutral.500 | Focus/active borders |

**Primary Interactive**

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--pm-primary` | primary.600 | primary.500 | Primary action bg |
| `--pm-primary-hover` | primary.700 | primary.400 | Primary hover |
| `--pm-primary-active` | primary.800 | primary.600 | Primary pressed |
| `--pm-primary-fg` | neutral.0 | neutral.0 | Text on primary bg |
| `--pm-primary-subtle` | primary.50 | primary.900 | Subtle primary bg |
| `--pm-primary-subtle-hover` | primary.100 | primary.800 | Subtle primary hover |
| `--pm-primary-border` | primary.500 | primary.400 | Primary-colored border |

**Neutral Interactive**

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--pm-neutral` | neutral.100 | neutral.800 | Secondary button bg |
| `--pm-neutral-hover` | neutral.200 | neutral.700 | Neutral hover |
| `--pm-neutral-active` | neutral.300 | neutral.600 | Neutral pressed |
| `--pm-neutral-fg` | neutral.700 | neutral.200 | Text on neutral bg |
| `--pm-neutral-subtle` | neutral.100 | neutral.800 | Ghost hover bg |
| `--pm-neutral-subtle-hover` | neutral.200 | neutral.700 | Ghost active |
| `--pm-neutral-border` | neutral.300 | neutral.600 | Secondary button border |

**Status** (same pattern for danger, success, warning, info)

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--pm-{status}` | {s}.600 | {s}.500 | Solid status bg |
| `--pm-{status}-hover` | {s}.700 | {s}.400 | Hover |
| `--pm-{status}-active` | {s}.800 | {s}.600 | Pressed |
| `--pm-{status}-fg` | neutral.0 | neutral.0 | Text on solid status bg |
| `--pm-{status}-subtle` | {s}.50 | {s}.900 | Subtle status bg |
| `--pm-{status}-subtle-fg` | {s}.800 | {s}.100 | Text on subtle bg |
| `--pm-{status}-border` | {s}.200 | {s}.700 | Status border |

**Focus & Overlay**

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--pm-focus-ring` | primary.500 | primary.400 | Focus ring color |
| `--pm-overlay-bg` | `rgb(0 0 0 / 0.5)` | `rgb(0 0 0 / 0.7)` | Backdrop overlay |

---

## 4. Component Tokens (Tier 3)

Each component defines its own CSS custom properties as its theming API. These are defined on the component's root selector and reference semantic tokens.

### Pattern

```css
@layer pm.components {
  .pm-alert {
    /* Tier 3: Component tokens — the theming surface */
    --pm-alert-bg: var(--pm-bg-subtle);
    --pm-alert-color: var(--pm-fg);
    --pm-alert-border-color: var(--pm-border);
    --pm-alert-radius: var(--pm-radius-md);
    --pm-alert-padding: var(--pm-spacing-3) var(--pm-spacing-4);

    /* Consume component tokens */
    background-color: var(--pm-alert-bg);
    color: var(--pm-alert-color);
    border: 1px solid var(--pm-alert-border-color);
    border-radius: var(--pm-alert-radius);
    padding: var(--pm-alert-padding);
  }

  /* Variant overrides set component tokens to different semantic values */
  .pm-alert--danger {
    --pm-alert-bg: var(--pm-danger-subtle);
    --pm-alert-color: var(--pm-danger-subtle-fg);
    --pm-alert-border-color: var(--pm-danger-border);
  }
}
```

### Naming Convention

`--pm-<component>-<property>` — e.g., `--pm-btn-bg`, `--pm-btn-radius`, `--pm-card-shadow`

### Rules

1. Component tokens reference **semantic tokens** for colors — never primitive palette values
2. Component tokens reference **primitive tokens** for spacing, radius, typography, shadows
3. Variant modifiers set component tokens to different semantic values
4. Theme-specific behavioral overrides (e.g., Material `text-transform: uppercase`) stay in component CSS as theme-scoped selectors

---

## 5. Theme System

### How Themes Work

Themes override **primitive tokens** (color palettes, radii, typography, shadows, motion) and optionally **semantic tokens** (if the light/dark mapping differs). Component tokens automatically adapt because they reference semantic tokens.

```
Theme File → overrides primitives + semantics
  → semantic tokens re-resolve (light-dark picks up new primitives)
    → component tokens re-resolve (they reference semantics)
      → visual change cascades to all components
```

### Theme File Structure

```
packages/tokens/src/tokens/themes/
  material/
    color.json        — Material Design 3 color palettes
    shape.json        — Rounded corners, elevation shadows
    typography.json   — Roboto, Material type scale
    motion.json       — Material motion timing
  antd/
    color.json, shape.json, typography.json, motion.json
  bootstrap/
    color.json, shape.json, typography.json, motion.json
  dark-modern/
    color.json        — Inverted neutral palette, vibrant accents
    shape.json        — Glow shadows
  light-modern/
    color.json, shape.json
```

### Theme CSS Output

Theme files override tokens inside a scoped class selector within `@layer pm.tokens`:

```css
@layer pm.tokens {
  .pm-theme-material {
    color-scheme: light dark;

    /* Override primitives */
    --pm-color-primary-500: #6750a4;
    --pm-radius-md: 12px;
    --pm-font-family-sans: Roboto, system-ui, sans-serif;

    /* Override semantics (when light/dark mapping differs from default) */
    --pm-primary: light-dark(var(--pm-color-primary-500), var(--pm-color-primary-200));
  }
}
```

### Pre-Built Themes

| Theme Class | Description | Primary | Key Characteristics |
|---|---|---|---|
| *(none)* | Default minimalistic | Blue (#3b82f6) | System fonts, minimal shadows, generous whitespace |
| `pm-theme-material` | Material Design 3 | Purple (#6750a4) | Rounded 12-28px, elevation shadows, Roboto |
| `pm-theme-antd` | Ant Design | Blue (#1677ff) | 4-6px radius, compact density, specific shadow scale |
| `pm-theme-bootstrap` | Bootstrap | Blue (#0d6efd) | 6-8px radius, distinctive shadows, pill-radius option |
| `pm-theme-dark-modern` | Dark vibrant | Blue (#3b82f6) | Inverted neutrals, glow effects, dark surfaces |
| `pm-theme-light-modern` | Clean refined | Blue (#3b82f6) | Elevated shadows, smooth transitions |

### Theme Application

```html
<!-- Default minimalistic (no class needed) -->
<body>...</body>

<!-- Built-in theme -->
<body class="pm-theme-material">...</body>

<!-- Force dark mode -->
<body class="pm-theme-material pm-dark">...</body>

<!-- Custom theme: override tokens -->
<body class="my-custom-theme">...</body>
```

### Creating a Custom Theme

Override `--pm-*` tokens in a class selector:

```css
.my-theme {
  color-scheme: light dark;

  /* Override primitive tokens — semantic tokens auto-resolve */
  --pm-color-primary-500: #8b5cf6;
  --pm-color-primary-600: #7c3aed;
  --pm-radius-md: 12px;
  --pm-font-family-sans: "Inter", system-ui, sans-serif;

  /* Optionally override semantic tokens (if light/dark mapping should differ) */
  --pm-primary: light-dark(var(--pm-color-primary-600), var(--pm-color-primary-400));
}
```

**Key insight**: Most custom themes only need to override primitive tokens. Semantic and component tokens automatically adjust because they reference primitives via `var()`.

### Adding a New Built-In Theme

1. Create `packages/tokens/src/tokens/themes/<name>/` with override JSON files
2. Use DTCG format — only include tokens that differ from the default
3. Run `pnpm --filter @paramanu/tokens build` — generates `dist/css/theme-<name>.css`
4. Add export in `packages/tokens/package.json`: `"./css/themes/<name>": "./dist/css/theme-<name>.css"`
5. Update storybook theme switchers and docs

---

## 6. Dark Mode

### How It Works

1. `:root` declares `color-scheme: light dark` — enables the `light-dark()` CSS function
2. Semantic tokens use `light-dark()` to carry both light and dark values
3. The browser automatically selects the appropriate value based on `color-scheme`
4. Components consume semantic tokens — dark mode is fully automatic

### Color Scheme Control

```css
/* In tokens.css — enables automatic detection */
:root { color-scheme: light dark; }

/* Utility classes for manual override */
.pm-light { color-scheme: light; }
.pm-dark  { color-scheme: dark; }
.pm-auto  { color-scheme: light dark; }
```

### Rules for Components

- **Never** use `light-dark()` with primitive tokens in component CSS
- **Always** use semantic tokens for colors — they carry dark mode built-in
- The only acceptable `light-dark()` in component CSS is for exceptional raw values (e.g., glow effects with `rgba()`)

```css
/* CORRECT */
.pm-card {
  background: var(--pm-bg);
  color: var(--pm-fg);
  border-color: var(--pm-border);
}

/* WRONG */
.pm-card {
  background: light-dark(var(--pm-color-neutral-0), var(--pm-color-neutral-900));
}
```

---

## 7. Theme Completeness Requirement

**Every pre-built theme MUST support every component in the design system.**

When a new component is added:

1. Verify it renders correctly with no theme class (default)
2. Verify it renders correctly in all 5 built-in themes
3. Verify light and dark mode in each theme
4. Add component-specific behavioral overrides to theme files ONLY if the theme requires unique behavior (e.g., Material `text-transform: uppercase` for buttons). Color/spacing/radius adaptations are handled automatically via primitive token overrides.

### Theme Update Checklist (per component)

- [ ] Default: Component looks good with no theme class
- [ ] `dark-modern`: Dark surface, vibrant accents, glow on focus
- [ ] `light-modern`: Light surface, refined shadows, modern radius
- [ ] `antd`: Matches Ant Design look (compact, small radius, specific colors)
- [ ] `material`: Matches Material Design look (elevation, rounded, specific typography)
- [ ] `bootstrap`: Matches Bootstrap look (medium radius, distinctive shadows)
- [ ] Dark mode: Semantic tokens produce correct light/dark values
- [ ] Storybook: Verified in theme switcher (all themes × light/dark)

---

## 8. Consumer Import Patterns

Token CSS is NOT bundled into component CSS. Consumers must import both.

### Minimal Setup

```typescript
import "@paramanu/tokens/css/layer-order"   // @layer order declaration (MUST be first)
import "@paramanu/tokens/css/reset"          // CSS reset
import "@paramanu/tokens/css"                // Primitives + semantics
import "@paramanu/buttons-js/css"            // Component CSS
```

### With Themes

```typescript
import "@paramanu/tokens/css/layer-order"
import "@paramanu/tokens/css/reset"
import "@paramanu/tokens/css"
import "@paramanu/tokens/css/themes"         // All themes (or import individually)
import "@paramanu/buttons-js/css"
```

### With @property (for smooth token transitions)

```typescript
import "@paramanu/tokens/css/properties"     // @property declarations
import "@paramanu/tokens/css/layer-order"
import "@paramanu/tokens/css/reset"
import "@paramanu/tokens/css"
```

### Tree-Shaking (per-component imports)

```typescript
import "@paramanu/tokens/css"
import "@paramanu/buttons-js/css/button"           // Only button CSS
import "@paramanu/buttons-js/css/icon-button"       // Only icon-button CSS
```

### CDN

```html
<link rel="stylesheet" href="https://cdn.paramanu.dev/paramanu.css">
<link rel="stylesheet" href="https://cdn.paramanu.dev/paramanu-theme-material.css">
<script src="https://cdn.paramanu.dev/paramanu.min.js"></script>
```

The CDN bundle includes tokens + all component CSS in a single file.

---

## 9. Storybook Theme Switcher

Both React and vanilla Storybooks include a global theme switcher in the toolbar.

### Preview Setup

```typescript
// Import order matters
import "@paramanu/tokens/css/layer-order"
import "@paramanu/tokens/css/reset"
import "@paramanu/tokens/css"
import "@paramanu/tokens/css/themes"
import "@paramanu/primitives-js/css"
import "@paramanu/buttons-js/css"
// ... all other component packages
```

### Switcher Options

| Option | Theme Class | Color Scheme |
|---|---|---|
| Default (Light) | *(none)* | `light` |
| Default (Dark) | *(none)* | `dark` |
| Light Modern | `pm-theme-light-modern` | `light` |
| Dark Modern | `pm-theme-dark-modern` | `dark` |
| Material (Light) | `pm-theme-material` | `light` |
| Material (Dark) | `pm-theme-material` | `dark` |
| Ant Design (Light) | `pm-theme-antd` | `light` |
| Ant Design (Dark) | `pm-theme-antd` | `dark` |
| Bootstrap (Light) | `pm-theme-bootstrap` | `light` |
| Bootstrap (Dark) | `pm-theme-bootstrap` | `dark` |

### Theme Decorator

The decorator sets the theme class on `<html>` and overrides `color-scheme`:

```typescript
const THEME_MAP = {
  "default": { className: "", colorScheme: "light" },
  "default-dark": { className: "", colorScheme: "dark" },
  "material": { className: "pm-theme-material", colorScheme: "light" },
  "material-dark": { className: "pm-theme-material", colorScheme: "dark" },
  // ...
}

// Decorator applies theme class + color-scheme to <html>
decorators: [(Story, context) => {
  const theme = THEME_MAP[context.globals.theme]
  document.documentElement.className = theme.className
  document.documentElement.style.colorScheme = theme.colorScheme
  return Story()
}]
```
