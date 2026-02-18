# Paramanu Implementation Plan

Detailed plan for implementing the remaining infrastructure, tooling, and process improvements.

---

## Status Summary

### Completed
- [x] Created `agents-guidelines/` directory with 9 guideline files (single source of truth)
  - `writing-code.md`, `writing-tests.md`, `writing-stories.md`, `writing-docs.md`
  - `component-api-research.md`, `consistency-review.md`, `theming.md`
  - `single-agent-workflow.md`, `multi-agent-workflow.md`
- [x] All Claude skills (10 total) are pure pointers to `agents-guidelines/`
- [x] `AGENTS.md` for Codex/Gemini/Amp — pure pointer
- [x] `.cursor/rules/*.mdc` for Cursor (7 files, glob-scoped) — pure pointers
- [x] `.github/copilot-instructions.md` + `.github/instructions/` for Copilot — pure pointers
- [x] `.windsurf/rules/` for Windsurf — pure pointer
- [x] `.clinerules/` for Cline — pure pointers
- [x] `.amazonq/rules/` for Amazon Q — pure pointer
- [x] All agent configs reference `agents-guidelines/` with ZERO inline guidelines

### Remaining Work

---

## 1. Move Stories Into Packages

**Current**: Stories in `apps/storybook-react/src/stories/` and `apps/storybook-vanilla/src/stories/`
**Target**: Stories in `packages/<group>-{js,react}/src/<component>/` alongside components

### Steps
- [ ] Move `button.stories.tsx` → `packages/buttons-react/src/button/`
- [ ] Move `button-group.stories.tsx` → `packages/buttons-react/src/button-group/`
- [ ] Move vanilla stories similarly to `packages/buttons-js/src/*/`
- [ ] Create missing stories for: close-button, icon-button, toggle-button, toggle-group, fab
- [ ] Update `apps/storybook-react/.storybook/main.ts` stories glob to `"../../../packages/*-react/src/**/*.stories.@(ts|tsx)"`
- [ ] Update `apps/storybook-vanilla/.storybook/main.ts` stories glob to `"../../../packages/*-js/src/**/*.stories.@(ts|tsx)"`
- [ ] Delete old `apps/storybook-*/src/stories/` directories
- [ ] Add `*.stories.ts` to tsup exclude patterns

---

## 2. Storybook Theme Switcher

**Guideline**: `agents-guidelines/theming.md` (section 8)

### Steps
- [ ] Create theme CSS files in `packages/tokens/src/themes/` (dark-modern, light-modern, antd, material, bootstrap)
- [ ] Add theme CSS exports to `packages/tokens/package.json`
- [ ] Create `.storybook/custom-theme.css` in both Storybook apps
- [ ] Update `apps/storybook-react/.storybook/preview.ts`:
  - Import all theme CSS files
  - Import custom-theme.css
  - Add `globalTypes.theme` with toolbar switcher (7 options: Default + 5 built-in + Custom)
  - Add theme decorator that wraps stories in themed div
- [ ] Update `apps/storybook-vanilla/.storybook/preview.ts` similarly
- [ ] Verify all existing button components render correctly in all themes

---

## 3. Theme Completeness for All Components

**Guideline**: `agents-guidelines/theming.md` (section 4)

Every pre-built theme must support every component. When implementing new components:

- [ ] Default theme: Verify component with no theme class
- [ ] dark-modern: Dark surface, vibrant accents, glow focus
- [ ] light-modern: Light surface, refined shadows, modern radius
- [ ] antd: Compact, 4px radius, Ant Design colors
- [ ] material: Elevation, Roboto tokens, Material colors
- [ ] bootstrap: Bootstrap blue, pill radius, utility-friendly
- [ ] Dark mode: `light-dark()` values correct in all
- [ ] Storybook: Verified via theme switcher

---

## 4. Enhance Existing Button Stories

Per component (7 × 2 frameworks = 14 story files). Follow `agents-guidelines/writing-stories.md`:

- [ ] Playground story with all controls
- [ ] Stories for every variant, size, boolean modifier
- [ ] Variant × Size matrix story
- [ ] States story (default, disabled)
- [ ] Composition stories (icons, groups)
- [ ] Edge cases (long text, overflow, RTL)
- [ ] Play functions for interaction tests
- [ ] A11y stories (aria-label, focus ring, keyboard)
- [ ] `tags: ["autodocs"]` + JSDoc descriptions

---

## 5. JSDoc Enhancement

Follow `agents-guidelines/writing-code.md` (section 2). All 7 button components need:

- [ ] Every type and prop gets JSDoc with `@default`
- [ ] Every class builder gets `@param`, `@returns`, `@example`, `@since`
- [ ] Every React component gets `@example`, `@see`, `@since`

---

## 6. API Documentation Auto-Generation

Follow `agents-guidelines/writing-docs.md` (section 3):

- [ ] Choose approach (TypeDoc vs custom TS Compiler API extraction)
- [ ] Set up extraction pipeline from `*.types.ts` JSDoc
- [ ] Add `generate:api` script
- [ ] Create `<PropsTable>` MDX component
- [ ] Integrate into docs build

---

## 7. axe-core Integration

Follow `agents-guidelines/writing-tests.md` (section 3):

- [ ] Install `vitest-axe` or `jest-axe`
- [ ] Add axe checks to every `*.a11y.test.ts`
- [ ] Configure rules (disable color-contrast in JSDOM)

---

## 8. Complete Documentation

Follow `agents-guidelines/writing-docs.md`. For each undocumented button component:

- [ ] Create MDX at `apps/docs/src/content/docs/components/buttons/<component>.mdx`
- [ ] Usage + Guidelines + API tabs
- [ ] Add to sidebar

---

## 9. Enhance Test Coverage

Follow `agents-guidelines/writing-tests.md`:

- [ ] Event handler tests (onClick, disabled not clickable)
- [ ] Keyboard tests (Tab, Enter, Space)
- [ ] axe-core in a11y tests
- [ ] `composeStories` integration

---

## 10. Storybook Test Runner + Portable Stories

- [ ] Install `@storybook/test-runner` in both apps
- [ ] Add `composeStories` tests in `-react` packages
- [ ] Add `test-storybook` script to root

---

## 11. CI/CD Pipeline

- [ ] Storybook build step
- [ ] Storybook test-runner step
- [ ] API doc generation step
- [ ] Turbo caching

---

## 12. Update CLAUDE.md

- [ ] Replace legacy `packages/core` / `packages/react` references
- [ ] Add reference to `agents-guidelines/` directory
- [ ] Remove content that duplicates guidelines

---

## 13. Update .gitignore

- [ ] Ensure `.cursor/`, `.windsurf/`, `.clinerules/`, `.amazonq/`, `agents-guidelines/` are tracked
- [ ] Verify no agent config directories are gitignored

---

## Priority Order

| Phase | Items | Focus |
|---|---|---|
| **Phase 1: Infrastructure** | §1, §2, §12, §13 | Move stories, theme switcher, update refs |
| **Phase 2: Quality** | §3, §4, §5, §7, §9 | Themes, stories, JSDoc, axe, tests |
| **Phase 3: Documentation** | §6, §8 | API generation, MDX docs |
| **Phase 4: CI/CD** | §10, §11 | Test runner, pipeline |
