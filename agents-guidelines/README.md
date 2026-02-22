# Paramanu Development Guidelines

Canonical guidelines for all development activity on the Paramanu design system. These files are the **single source of truth** — all agent configurations (Claude, Codex, Cursor, Copilot, Windsurf, Cline, etc.) reference these files. Agent-specific config files contain ONLY pointers to identify which guideline applies to which files/tasks.

## Guidelines Index

| Guideline                                                | When to Use                                                       |
| -------------------------------------------------------- | ----------------------------------------------------------------- |
| [writing-code.md](./writing-code.md)                     | Writing or modifying any TypeScript, CSS, or configuration code   |
| [writing-tests.md](./writing-tests.md)                   | Writing unit tests, accessibility tests, or React component tests |
| [writing-stories.md](./writing-stories.md)               | Writing Storybook stories (vanilla HTML or React)                 |
| [writing-docs.md](./writing-docs.md)                     | Writing component documentation pages (MDX)                       |
| [component-api-research.md](./component-api-research.md) | Researching a new component's API before implementation           |
| [consistency-review.md](./consistency-review.md)         | Reviewing components for cross-component consistency              |
| [theming.md](./theming.md)                               | Working on themes, design tokens, CSS variables, dark mode        |
| [single-agent-workflow.md](./single-agent-workflow.md)   | Single agent implementing a component end-to-end                  |
| [multi-agent-workflow.md](./multi-agent-workflow.md)     | Multiple agents collaborating on a task                           |

## Architecture

```
agents-guidelines/          <- Single source of truth (this directory)
  writing-code.md
  writing-tests.md
  writing-stories.md
  writing-docs.md
  component-api-research.md
  consistency-review.md
  theming.md
  single-agent-workflow.md
  multi-agent-workflow.md

Agent-specific configs (POINTERS ONLY - no inline guidelines):
  .claude/skills/*.md         -> Claude Code (auto-loaded by task context)
  AGENTS.md                   -> Codex, Gemini CLI, Amp
  .cursor/rules/*.mdc         -> Cursor (glob-scoped)
  .github/copilot-instructions.md + .github/instructions/  -> GitHub Copilot
  .windsurf/rules/*.md        -> Windsurf
  .clinerules/*.md            -> Cline
  .amazonq/rules/*.md         -> Amazon Q
```

## Rules for Agent Config Files

Agent-specific configs MUST:

1. Be lightweight pointers (no inline code examples, no detailed rules)
2. Reference `agents-guidelines/<file>.md` for the actual content
3. Only contain enough context for the agent to identify WHICH guideline to read
4. Never duplicate content from the guidelines

## Updating Guidelines

1. Edit files in this `agents-guidelines/` directory
2. All agent configs automatically pick up changes (they reference, not copy)
3. If you add a new guideline file, add a corresponding pointer entry in each agent config directory
