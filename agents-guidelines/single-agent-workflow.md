# Single Agent Workflow

Apply when a single agent is implementing a component, feature, or change end-to-end. This guideline defines the step-by-step plan structure where each step references the specific guideline to follow.

---

## 1. Purpose

When a single agent works on a component or feature, it MUST create an implementation plan that breaks work into discrete steps. Each step explicitly references which guideline to follow. This ensures:

- Correct ordering (research before code, code before tests, tests before docs)
- No skipped phases (accessibility, stories, and docs are not optional)
- Consistent quality (every step follows the documented standard)

---

## 2. New Component Implementation Plan

When implementing a new component from scratch, create a plan with these steps **in this exact order**:

### Step 1: Research

**Guideline**: `agents-guidelines/component-api-research.md`

- Survey Tier 1 design systems (Ant Design, MUI, Carbon, Chakra, Radix, Mantine)
- Build feature comparison matrix
- Design API following Paramanu conventions
- Research WAI-ARIA patterns and keyboard interactions
- Present requirements document for approval
- **Gate**: Do not proceed until requirements are approved

### Step 2: Implement JS Package

**Guideline**: `agents-guidelines/writing-code.md`

- Create types file (`*.types.ts`) with JSDoc on every type and prop
- Create class builder file (`*.classes.ts`) with `<component>Classes()` + `<component>ModuleClasses()`
- Create CSS file (`*.css`) in `@layer pm.components` using `--pm-*` tokens
- Create CSS module file (`*.module.css`) with flat selectors
- Export from package index (`src/index.ts`)

### Step 3: Implement React Package

**Guideline**: `agents-guidelines/writing-code.md`

- Create React component (`*.tsx`) with `forwardRef`, className merge, rest spread
- JSDoc with `@example`, `@see`, `@since`
- Export from package index

### Step 4: Write Tests

**Guideline**: `agents-guidelines/writing-tests.md`

- Class builder unit tests (`*.test.ts`) — all variants, sizes, modifiers, combinations
- Accessibility tests (`*.a11y.test.ts`) — semantic element, ARIA, disabled, axe-core
- React component tests (`*.test.tsx`) — rendering, props, ref, className, disabled, events

### Step 5: Write Stories

**Guideline**: `agents-guidelines/writing-stories.md`

- Vanilla stories (`*.stories.ts` in `-js` package)
- React stories (`*.stories.tsx` in `-react` package)
- Required: Playground, per-variant, per-size, per-modifier, matrix, states, composition, edge cases
- Play functions for interaction tests

### Step 6: Update Themes

**Guideline**: `agents-guidelines/theming.md`

- Verify component renders correctly in all 5 pre-built themes + default
- Add component-specific variable overrides in each theme file if needed
- Test in Storybook theme switcher

### Step 7: Write Documentation

**Guideline**: `agents-guidelines/writing-docs.md`

- Create MDX file with 3 tabs: Usage, Guidelines, API
- API tab derived from JSDoc + types
- Add to Starlight sidebar

### Step 8: Verify

Run full verification:

```bash
pnpm build && pnpm test && pnpm typecheck && pnpm lint
```

---

## 3. Modifying an Existing Component

When modifying an existing component, the plan adapts based on what changed:

### Adding a new prop/variant

1. **Code** (`writing-code.md`): Update types, class builder, CSS
2. **Tests** (`writing-tests.md`): Add test cases for the new prop/variant
3. **Stories** (`writing-stories.md`): Add stories for the new prop/variant
4. **Themes** (`theming.md`): Verify all themes support the new variant
5. **Docs** (`writing-docs.md`): Update API table, add usage example
6. **Verify**: `pnpm build && pnpm test && pnpm typecheck`

### Fixing a bug

1. **Reproduce**: Write a failing test first
2. **Fix** (`writing-code.md`): Apply the fix
3. **Verify**: Run tests, check all themes
4. **Update**: Stories/docs if behavior changed

### Refactoring

1. **Code** (`writing-code.md`): Refactor with no API changes
2. **Tests** (`writing-tests.md`): All existing tests must still pass
3. **Consistency** (`consistency-review.md`): Verify refactored code follows patterns
4. **Verify**: `pnpm build && pnpm test && pnpm typecheck`

---

## 4. Cross-Cutting Changes

When making changes that affect multiple components (e.g., adding a new token, changing a shared pattern):

1. **Identify scope**: List all affected components and packages
2. **Update foundation** (`writing-code.md`): Change tokens/primitives/utilities first
3. **Propagate** (`writing-code.md`): Update each consuming component
4. **Test all** (`writing-tests.md`): Run full test suite
5. **Update themes** (`theming.md`): Verify all themes still work
6. **Update stories** (`writing-stories.md`): Check all stories render correctly
7. **Update docs** (`writing-docs.md`): Update any affected documentation
8. **Consistency check** (`consistency-review.md`): Verify consistency across all affected components

---

## 5. Plan Template

When creating a plan, use this structure:

```markdown
# Implementation Plan: [Component/Feature Name]

## Step 1: Research

**Guideline**: `agents-guidelines/component-api-research.md`

- [ ] Survey design systems
- [ ] Build comparison matrix
- [ ] Design API
- [ ] Research accessibility
- [ ] Get approval

## Step 2: Implement JS

**Guideline**: `agents-guidelines/writing-code.md`

- [ ] Types with JSDoc
- [ ] Class builders
- [ ] CSS
- [ ] Module CSS
- [ ] Package exports

## Step 3: Implement React

**Guideline**: `agents-guidelines/writing-code.md`

- [ ] forwardRef component
- [ ] Package exports

## Step 4: Tests

**Guideline**: `agents-guidelines/writing-tests.md`

- [ ] Class builder tests
- [ ] A11y tests (JSDOM + axe)
- [ ] React tests

## Step 5: Stories

**Guideline**: `agents-guidelines/writing-stories.md`

- [ ] Vanilla stories
- [ ] React stories
- [ ] Play functions

## Step 6: Themes

**Guideline**: `agents-guidelines/theming.md`

- [ ] Default theme
- [ ] All 5 pre-built themes
- [ ] Dark mode

## Step 7: Documentation

**Guideline**: `agents-guidelines/writing-docs.md`

- [ ] Usage tab
- [ ] Guidelines tab
- [ ] API tab

## Step 8: Verify

- [ ] pnpm build
- [ ] pnpm test
- [ ] pnpm typecheck
- [ ] pnpm lint
```
