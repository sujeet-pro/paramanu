# Multi-Agent Workflow

Apply when multiple agents are collaborating on implementing components or features. This guideline defines how to divide work across agents based on task type, what each agent is responsible for, and how they coordinate.

---

## 1. Purpose

Multi-agent workflows enable parallelism. By splitting work by task type, agents avoid merge conflicts and can work independently. Each agent follows the specific guideline for their task type.

---

## 2. Agent Roles

### Role: Researcher

**Guideline**: `agents-guidelines/component-api-research.md`

Survey design systems, build feature comparison matrices, design API proposals, research accessibility requirements. Produces a requirements document.

**Output**: Requirements document with API interfaces, feature list, accessibility spec, CSS variables.
**Works in**: Read-only (no file writes except the requirements doc).
**Blocks**: All other roles — implementation cannot start until research is approved.

### Role: Implementer (JS)

**Guideline**: `agents-guidelines/writing-code.md` + `agents-guidelines/theming.md`

Create types (`*.types.ts`), class builders (`*.classes.ts`), CSS (`*.css`, `*.module.css`), package exports, and theme overrides in all 5 theme files.

**Output**: Complete `-js` package component + theme updates.
**Works in**: `packages/<group>-js/src/<component>/` + `packages/tokens/src/themes/`
**Blocks**: Implementer (React), Test Writer (JS), Story Writer (JS).

### Role: Implementer (React)

**Guideline**: `agents-guidelines/writing-code.md`

Create React component (`*.tsx`) with `forwardRef`, JSDoc, package exports.

**Output**: Complete `-react` package component.
**Works in**: `packages/<group>-react/src/<component>/`
**Depends on**: Implementer (JS).
**Blocks**: Test Writer (React), Story Writer (React).

### Role: Test Writer

**Guideline**: `agents-guidelines/writing-tests.md`

Class builder unit tests, accessibility tests (JSDOM + axe-core), React component tests.

**Output**: Complete test files (`*.test.ts`, `*.a11y.test.ts`, `*.test.tsx`).
**Works in**: Same directories as components (test files alongside source).
**Depends on**: Implementer (JS) for JS tests; Implementer (React) for React tests.

### Role: Story Writer

**Guideline**: `agents-guidelines/writing-stories.md`

Vanilla stories and React stories with all required story types and play functions.

**Output**: Complete story files (`*.stories.ts`, `*.stories.tsx`).
**Works in**: Same directories as components.
**Depends on**: Implementer (JS) for vanilla stories; Implementer (React) for React stories.

### Role: Doc Writer

**Guideline**: `agents-guidelines/writing-docs.md`

Create MDX documentation page with 3 tabs (Usage, Guidelines, API), update sidebar.

**Output**: MDX file + sidebar config update.
**Works in**: `apps/docs/src/content/docs/components/<group>/`
**Depends on**: Implementer (JS) for types/API, Researcher for accessibility guidelines.
**Can start early**: Guidelines tab (accessibility, keyboard) can be written from research output.

### Role: Reviewer

**Guideline**: `agents-guidelines/consistency-review.md`

Review all output for consistency across components. Verify naming, CSS, tests, stories, docs.

**Output**: Review report with findings and fixes.
**Runs after**: All other roles complete.

---

## 3. Task Breakdown Patterns

### Pattern A: Single Component (maximum parallelism)

```
                      Researcher
                     (research.md)
                          |
                   requirements approved
                          |
                   Implementer JS
                  (code.md + theming.md)
                    /     |     \
          Test Writer  Impl React  Story Writer
          JS (tests)   (code.md)   JS (stories)
                         |
                       /   \
             Test Writer   Story Writer
             React          React
                         |
                     Doc Writer
                      (docs.md)
                         |
                      Reviewer
                  (consistency.md)
```

### Pattern B: Multiple Components (by component)

Assign one agent per component. Each follows `single-agent-workflow.md`:

```
Agent 1: Component A (research -> code -> test -> stories -> docs)
Agent 2: Component B (research -> code -> test -> stories -> docs)
Agent 3: Component C (research -> code -> test -> stories -> docs)
Reviewer: Reviews all when done
```

No file conflicts since each component has its own directory.

### Pattern C: Multiple Components (by task type)

Split by specialization across all components:

```
Researcher:     Research all components, produce requirements for each
Implementer(s): Implement all JS packages (parallelize by component)
React Dev:      Implement all React wrappers (after JS done)
Test Writer:    Write all tests (after implementation)
Story Writer:   Write all stories (after implementation)
Doc Writer:     Write all docs (after implementation + research)
Reviewer:       Final consistency review
```

### Pattern D: Bug Fix or Enhancement (2-3 agents)

```
Agent 1: Fix/implement the code change (writing-code.md)
Agent 2: Update tests + stories (writing-tests.md + writing-stories.md)
Agent 3: Update documentation (writing-docs.md)
```

---

## 4. Coordination Rules

### File Ownership

| Agent             | Owns                                                  |
| ----------------- | ----------------------------------------------------- |
| Implementer JS    | `*.types.ts`, `*.classes.ts`, `*.css`, `*.module.css` |
| Implementer React | `*.tsx`                                               |
| Test Writer       | `*.test.ts`, `*.a11y.test.ts`, `*.test.tsx`           |
| Story Writer      | `*.stories.ts`, `*.stories.tsx`                       |
| Doc Writer        | `apps/docs/.../<component>.mdx`                       |
| Theme Updater     | `packages/tokens/src/themes/*.css`                    |

### Shared Files (coordinate sequential writes)

- `packages/<group>-js/src/index.ts` — Implementer JS
- `packages/<group>-react/src/index.ts` — Implementer React
- `apps/docs/astro.config.mjs` — Doc Writer
- `apps/storybook-*/preview.ts` — Story Writer (CSS imports for new packages)

### Dependency Wait Rules

- Never start implementation before research is approved
- Never start React before JS is complete
- Never start tests before the code they test exists
- Never start stories before the component they demo exists
- Doc Writer CAN start the Guidelines tab early from research output
- Reviewer runs AFTER everything else is done

---

## 5. Task Creation Template

```
Task 1: [Research] Research <Component> API              -> Researcher
Task 2: [JS]       Implement <Component> types/classes   -> Implementer JS
Task 3: [React]    Implement <Component> React wrapper   -> Implementer React
Task 4: [Test]     Write <Component> tests               -> Test Writer
Task 5: [Stories]  Write <Component> stories             -> Story Writer
Task 6: [Themes]   Update all themes for <Component>     -> Implementer JS
Task 7: [Docs]     Write <Component> documentation       -> Doc Writer
Task 8: [Review]   Review <Component> for consistency    -> Reviewer

Dependencies:
  Task 2 blocked by Task 1
  Task 3 blocked by Task 2
  Task 4 blocked by Task 2 (JS tests), Task 3 (React tests)
  Task 5 blocked by Task 2 (vanilla), Task 3 (React)
  Task 6 blocked by Task 2
  Task 7 blocked by Task 1, Task 2
  Task 8 blocked by Tasks 2-7
```

---

## 6. Verification

After all agents complete:

```bash
pnpm build && pnpm test && pnpm typecheck && pnpm lint
```

Reviewer runs `agents-guidelines/consistency-review.md` checklist across all components.
