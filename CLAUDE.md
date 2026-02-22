# Paramanu Design System

A themeable, accessible, framework-agnostic design system built as a pnpm monorepo.

## Project Structure

```
paramanu/
  packages/
    tokens/             - Design tokens (colors, spacing, typography, etc.) + reset CSS + layer order
    primitives-js/      - Layout & base building blocks (JS + CSS)
    primitives-react/   - React wrappers for primitives
    typography-js/      - Text & content formatting (JS + CSS)
    typography-react/   - React wrappers for typography
    buttons-js/         - Buttons & action triggers (JS + CSS)
    buttons-react/      - React wrappers for buttons
    forms-js/           - Form controls & data entry (JS + CSS)
    forms-react/        - React wrappers for forms
    navigation-js/      - Navigation & wayfinding (JS + CSS)
    navigation-react/   - React wrappers for navigation
    data-display-js/    - Data display & visualization (JS + CSS)
    data-display-react/ - React wrappers for data display
    feedback-js/        - Feedback & status indicators (JS + CSS)
    feedback-react/     - React wrappers for feedback
    overlays-js/        - Overlays & floating UI (JS + CSS)
    overlays-react/     - React wrappers for overlays
    disclosure-js/      - Disclosure & collapsible content (JS + CSS)
    disclosure-react/   - React wrappers for disclosure
    utilities-js/       - Utilities & providers (JS + CSS)
    utilities-react/    - React wrappers for utilities
    cdn/                - Pre-bundled CDN distribution
  apps/
    docs/               - Astro-based documentation site
    storybook-react/    - React Storybook
    storybook-vanilla/  - Vanilla HTML Storybook
  tooling/
    tsconfig/           - Shared TypeScript configs (base, react, node)
    eslint-config/      - Shared ESLint config
```

## Package Architecture

Components are organized into per-group packages following the naming convention `@paramanu/<group>-js` (framework-agnostic) and `@paramanu/<group>-react` (React wrappers). This enables future framework packages (e.g., `<group>-vue`, `<group>-svelte`) and keeps the dependency graph lean.

- `@paramanu/tokens` - Three-tier token system: primitive tokens (`src/tokens/primitive/*.json`) + semantic tokens (`src/tokens/semantic/*.json`) + theme overrides (`src/tokens/themes/*/`). Built via DTCG-format JSON → CSS custom properties + JS exports. Outputs: `tokens.css` (combined), `primitives.css`, `semantic.css`, `properties.css` (`@property`), `reset.css`, `layers.css`, `theme-*.css`. Build: `tsx src/build.ts`.
- `@paramanu/<group>-js` - Component logic (`*.classes.ts`) + CSS (`*.css` + `*.module.css`). Component CSS uses semantic tokens — no primitive color refs or `light-dark()`. Exports class-builder functions and types. Depends on `@paramanu/tokens` + cross-package deps. CSS build via shared `tooling/css-build/`. Build: `tsx css.build.ts && tsup`.
- `@paramanu/<group>-react` - React components using `@paramanu/<group>-js` class builders. Depends on corresponding `-js` package. Build: `tsup`.
- `@paramanu/cdn` - Bundled CSS+JS for CDN use. Combines tokens + all component CSS + theme files. Build: `tsx build.ts` with esbuild + lightningcss.

### Package Dependency Levels

Packages are layered to avoid circular dependencies. See `components-list.md` for the full dependency table.

```
Level 0: tokens
Level 1: primitives-js, typography-js, utilities-js        (depend only on tokens)
Level 2: buttons-js, data-display-js, feedback-js,         (depend on Level 0-1)
         forms-js, navigation-js, disclosure-js
Level 3: overlays-js                                        (depends on Level 0-2)
```

Cross-package dependencies (in addition to tokens):

| Package           | Dependencies                                                   |
| ----------------- | -------------------------------------------------------------- |
| `primitives-js`   | —                                                              |
| `typography-js`   | —                                                              |
| `utilities-js`    | —                                                              |
| `buttons-js`      | `primitives-js`                                                |
| `data-display-js` | `primitives-js`, `typography-js`                               |
| `feedback-js`     | `primitives-js`, `typography-js`, `buttons-js`                 |
| `forms-js`        | `primitives-js`, `typography-js`, `buttons-js`                 |
| `navigation-js`   | `primitives-js`, `typography-js`, `buttons-js`                 |
| `disclosure-js`   | `primitives-js`, `buttons-js`                                  |
| `overlays-js`     | `primitives-js`, `typography-js`, `buttons-js`, `utilities-js` |

### Cross-Package Reuse Rules

When building a component, **always reuse existing components** from dependency packages rather than reimplementing similar functionality:

1. **Layout** — Use `Box`, `Flex`, `Stack`, `Group` class builders from `primitives-js` for internal layout. Never write custom flexbox/grid utilities when a primitive exists.
2. **Text** — Use `Text`, `Heading` class builders from `typography-js` for any text content. Never create ad-hoc text styling classes.
3. **Buttons** — Use `Close Button` from `buttons-js` for dismissible alerts, dialog close, toast close. Use `Button` patterns for interactive triggers.
4. **Utilities** — Use `Portal`, `Focus Trap`, `Presence`, `Visually Hidden` from `utilities-js` for overlay/a11y behavior. Never reimplement focus trapping or portal rendering.
5. **Import class builders** — Call `fooClasses()` from the dependency package within your own class builder when composing. For example, `alertClasses()` in feedback-js should call `closeButtonClasses()` from buttons-js.
6. **Extend types** — Extend or compose types from dependency packages. For example, `AlertProps` should reference `CloseButtonProps` if it includes a close button.
7. **CSS composition** — Component CSS can reference dependency classes (e.g., `.pm-alert .pm-close-button { ... }`). Users are expected to import CSS from all used packages.
8. **Never depend upward** — A Level 1 package must never import from Level 2+. A Level 2 package must never import from Level 3. This prevents circular dependencies.
9. **Check before creating** — Before adding a new utility, layout helper, or text style to a component, check if `primitives-js`, `typography-js`, or `utilities-js` already provides it.

### Adding a New Framework Adapter

To add support for a new framework (e.g., Vue):

1. Create `packages/<group>-vue/` following the same scaffold pattern as `-react` packages
2. Depend on the corresponding `-js` package (e.g., `@paramanu/buttons-js`)
3. Import class builders and types from the `-js` package
4. Wrap them in framework-specific component syntax

## Naming Conventions

- Package names: `@paramanu/<group>-<framework>` (e.g., `@paramanu/buttons-js`, `@paramanu/buttons-react`)
- CSS class prefix: `pm-` (e.g., `pm-button`, `pm-button--primary`)
- CSS variable prefix: `--pm-` (e.g., `--pm-color-primary-500`, `--pm-spacing-4`)
- CSS layers: `pm.reset`, `pm.tokens`, `pm.base`, `pm.components`, `pm.utilities`
- File naming: `<component-name>.<type>.<ext>` where type = `types`, `classes`, `component`, `hook`, `provider`, `constant`, `test`, `a11y.test`, `stories`
- BEM methodology: `pm-<component>`, `pm-<component>--<modifier>`

## Tech Stack

- **Runtime**: Node >= 20, pnpm >= 9
- **Build**: Turbo, tsup, esbuild, lightningcss
- **Test**: Vitest, jsdom, @testing-library/react, axe accessibility tests
- **Formatting**: Prettier (no semi, double quotes, trailing commas, 100 print width, 2-space indent)
- **Storybook**: v8 for both React and vanilla HTML
- **Docs**: Astro with Starlight

## Key Patterns

### JS Component Pattern (e.g., Button in `buttons-js`)

1. `button.types.ts` - TypeScript interfaces for props and options
2. `button.classes.ts` - `buttonClasses()` (BEM) + `buttonModuleClasses()` (CSS modules) functions
3. `button.css` - Component styles using CSS nesting within `@layer pm.components`
4. `button.module.css` - CSS module version (flat selectors, no nesting)
5. `button.test.ts` - Unit tests for class builder functions
6. `button.a11y.test.ts` - Accessibility tests using jsdom

### React Component Pattern (e.g., Button in `buttons-react`)

1. `button.tsx` - `forwardRef` component using `@paramanu/buttons-js` class builders
2. `button.test.tsx` - Tests with @testing-library/react

### Import Patterns

```ts
// Token CSS (must be imported separately — not bundled into component CSS)
import "@paramanu/tokens/css/layer-order" // @layer order (must be first)
import "@paramanu/tokens/css/reset" // CSS reset
import "@paramanu/tokens/css" // Primitives + semantics
import "@paramanu/tokens/css/themes" // All theme overrides (or import individually)

// JS package: import from the group's -js package
import { buttonClasses } from "@paramanu/buttons-js"
import type { ButtonProps } from "@paramanu/buttons-js"

// React package: import from the group's -react package
import { Button } from "@paramanu/buttons-react"

// CSS: import full package or per-component
import "@paramanu/buttons-js/css" // All button components
import "@paramanu/buttons-js/css/button" // Tree-shakeable: just button
import "@paramanu/buttons-js/css/min" // Minified bundle

// Cross-package: import class builders from dependency packages
import { closeButtonClasses } from "@paramanu/buttons-js"
import { textClasses } from "@paramanu/typography-js"
import { flexClasses } from "@paramanu/primitives-js"
```

### Token System (Three Tiers)

- **Primitive tokens** (`@paramanu/tokens`): Raw values — color palettes, spacing, radii, typography, shadows, motion. Source: `packages/tokens/src/tokens/primitive/*.json` (DTCG format).
- **Semantic tokens** (`@paramanu/tokens`): Purpose-driven — bg, fg, border, interactive states. Carry light/dark values via `$extensions.pm.lightDark` → output as `light-dark()`. Source: `packages/tokens/src/tokens/semantic/*.json`.
- **Component tokens** (each `-js` package): Per-component theming surface — `--pm-btn-bg`, `--pm-alert-radius`. Defined in component CSS, reference semantic tokens for colors.
- Component CSS must NEVER use `light-dark()` with primitive refs. All dark mode is handled by semantic tokens.

### Theming

- All styling via CSS custom properties (`--pm-*`)
- Default theme is minimalistic/typographic (no theme class needed)
- Themes override primitive + semantic tokens via class selectors (e.g., `.pm-theme-material`)
- 5 built-in themes: material, antd, bootstrap, dark-modern, light-modern
- Theme files: `packages/tokens/src/tokens/themes/<name>/*.json` (DTCG, overrides only)
- Dark mode: automatic via `color-scheme: light dark` + semantic `light-dark()` tokens
- Color scheme utilities: `.pm-light`, `.pm-dark`, `.pm-auto`

### Accessibility

- WCAG 2.2 AA compliance required
- Semantic HTML elements (use `<button>`, `<nav>`, `<dialog>`, etc.)
- `aria-disabled` alongside `disabled` attribute
- `:focus-visible` for keyboard focus rings
- All interactive components must support keyboard navigation

## Implementation Order

When implementing a new package, component, or feature, always follow this sequence:

1. **JS package first** — Implement the `-js` version (types, class builders, CSS, tests, a11y tests). This is the foundation that all framework adapters depend on.
2. **React package second** — Implement the `-react` wrapper (component, tests) using the class builders and types from the `-js` package.
3. **Propagate changes** — After both JS and React versions are complete, identify all consumers of the changed package and update them:
   - Check which `-js` packages depend on the changed `-js` package (see the cross-package dependency table above).
   - Check the corresponding `-react` packages for those consumers.
   - Check `packages/cdn/` if the component is part of the CDN bundle.
   - Check `apps/storybook-react/` and `apps/storybook-vanilla/` for stories that need updating.
   - Check `apps/docs/` for documentation that references the component.
   - Update all affected consumers to use the new/changed exports, types, or class builders.

This ensures changes flow correctly through the dependency graph: `tokens → -js → -react → apps`.

## Component List

See `components-list.md` for the full list of planned components organized by group.

## Commands

- `pnpm build` - Build all packages
- `pnpm dev` - Dev mode for all packages
- `pnpm test` - Run all tests
- `pnpm lint` - Lint all packages
- `pnpm typecheck` - Type check all packages
