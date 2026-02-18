# Component API Research Guidelines

Apply when researching a new component before implementation, comparing design system APIs, or designing the API surface for a Paramanu component.

---

## 1. Research Process

Before writing any code for a new component, follow this systematic research process:

1. **Survey** popular design systems for the component
2. **Build** a feature comparison matrix
3. **Design** the Paramanu API based on findings
4. **Research** accessibility requirements
5. **Evaluate** DX and performance implications
6. **Document** the final requirements for implementation

---

## 2. Reference Design Systems

### Tier 1 — Major Systems (ALWAYS check all of these)

| System | URL | Notes |
|---|---|---|
| Ant Design | https://ant.design/components/ | Largest component library, most features |
| Material UI (MUI) | https://mui.com/material-ui/ | Material Design, comprehensive API |
| Carbon (IBM) | https://carbondesignsystem.com/components/ | Enterprise-focused, strong a11y |
| Chakra UI | https://chakra-ui.com/docs/components/ | DX-focused, composable |
| Radix UI | https://www.radix-ui.com/primitives | Headless, best-in-class a11y |
| Mantine | https://mantine.dev/ | Feature-rich, modern API |

### Tier 2 — Reference Implementations (check for specific patterns)

| System | URL | Notes |
|---|---|---|
| Headless UI | https://headlessui.com/ | Headless patterns for complex components |
| shadcn/ui | https://ui.shadcn.com/docs/components | Copy-paste approach, Tailwind-based |
| React Aria (Adobe) | https://react-aria.adobe.com/ | Most thorough a11y implementation |
| Ariakit | https://ariakit.org/ | Lightweight, a11y-first |
| Base UI (MUI) | https://mui.com/base-ui/ | Headless MUI components |
| Ark UI | https://ark-ui.com/ | Framework-agnostic state machines |
| Spectrum (Adobe) | https://spectrum.adobe.com/ | Design guidelines + component patterns |
| Kobalte | https://kobalte.dev/ | Solid.js — API inspiration |

### What to Document Per System

For each system that implements the component, record:

```markdown
### [System Name]
- **Props/API**: List main props and their types
- **Variants**: What variants are offered
- **Sizes**: What sizes are available
- **Compound components**: Does it use sub-components or flat props?
- **Controlled/Uncontrolled**: Does it support both patterns?
- **Accessibility**: What ARIA patterns does it use?
- **Unique features**: Anything notable that others don't have
- **Missing features**: What's absent compared to others
```

---

## 3. Feature Comparison Matrix

Create a comparison table for all features found across the surveyed systems:

```markdown
| Feature | Ant | MUI | Carbon | Chakra | Radix | Mantine | Paramanu Decision |
|---------|-----|-----|--------|--------|-------|---------|-------------------|
| Variants | 5 | 3 | 2 | 6 | N/A | 6 | ? |
| Sizes | 3 | 3 | 3 | 4 | N/A | 5 | ? |
| Loading state | Yes | Yes | Yes | Yes | No | Yes | ? |
| Icon support | Yes | Yes | Yes | Yes | No | Yes | ? |
| Compound | No | No | No | Yes | Yes | No | ? |
| Polymorphic | No | No | No | Yes | Yes | Yes | ? |
| ... | | | | | | | |
```

### Decision Criteria

- **Must have**: Features present in 4+ of the 6 Tier 1 systems
- **Should have**: Features in 2-3 Tier 1 systems that provide clear value
- **Won't have (initially)**: Niche features found in 0-1 systems — can be added later

---

## 4. API Design Principles

### DX-Friendly API

1. **Sensible defaults** — Most common usage requires minimal props
   ```tsx
   // Good: works with zero props
   <Button>Submit</Button>
   // Good: one prop to customize
   <Button variant="danger">Delete</Button>
   ```

2. **Flat props for simple cases** — No nested objects for common config
   ```tsx
   // Good
   <Alert variant="success" size="md" dismissible>Done!</Alert>
   // Bad
   <Alert config={{ variant: "success", size: "md", dismissible: true }}>Done!</Alert>
   ```

3. **Compound components for complex cases** — Sub-components when composition is needed
   ```tsx
   // Flat is fine for simple Dialog:
   <Dialog title="Confirm" description="Are you sure?">
   // Compound is better when consumers need control over layout:
   <Dialog>
     <Dialog.Trigger>Open</Dialog.Trigger>
     <Dialog.Content>
       <Dialog.Title>Confirm</Dialog.Title>
       <Dialog.Description>Are you sure?</Dialog.Description>
       <Dialog.Actions>
         <Button>Yes</Button>
         <Button variant="secondary">No</Button>
       </Dialog.Actions>
     </Dialog.Content>
   </Dialog>
   ```

4. **Consistent naming** — Follow existing patterns across all components:
   - `variant` for visual style (not `type`, `kind`, `appearance`)
   - `size` for size (not `scale`, `dimension`)
   - `disabled` for disabled state (not `isDisabled`)
   - `fullWidth` for full-width modifier (not `block`, `fluid`, `full`)

5. **Type safety** — Union types for constrained values, not `string`
   ```typescript
   // Good
   variant?: "primary" | "secondary" | "danger" | "ghost"
   // Bad
   variant?: string
   ```

### Paramanu API Patterns

```typescript
// Types file
export type ComponentVariant = "..." | "..."
export type ComponentSize = "sm" | "md" | "lg"

export interface ComponentClassesOptions {
  variant?: ComponentVariant
  size?: ComponentSize
  // boolean modifiers
}

export interface ComponentProps extends ComponentClassesOptions {
  // non-visual props
}
```

---

## 5. Accessibility Research

For every component, research and document:

### WAI-ARIA Authoring Practices

Check https://www.w3.org/WAI/ARIA/apg/patterns/ for the component's ARIA pattern:

```markdown
### ARIA Pattern: [Pattern Name]
- **Role**: `role="<role>"`
- **States**: `aria-expanded`, `aria-selected`, etc.
- **Properties**: `aria-labelledby`, `aria-describedby`, etc.
```

### Keyboard Interactions

Document the expected keyboard behavior:

```markdown
| Key | Action |
|-----|--------|
| Enter | Activates the button |
| Space | Activates the button |
| Tab | Moves focus to next focusable element |
| Escape | Closes the dialog |
```

### Focus Management

```markdown
- **Focus order**: Follows DOM order / custom focus management
- **Focus trap**: Yes/No (modals, dialogs, popovers)
- **Focus restoration**: Returns focus to trigger on close
- **Initial focus**: First focusable element / custom initial focus
```

### WCAG 2.2 AA Requirements

- Color contrast: 4.5:1 for text, 3:1 for large text / UI components
- Target size: minimum 24x24px for AA
- Focus indicator: visible and meets contrast requirements
- Motion: respects `prefers-reduced-motion`

### What Paramanu Handles vs Consumer Responsibility

```markdown
#### Paramanu Provides
- [x] Correct semantic element
- [x] ARIA roles and states
- [x] Keyboard navigation
- [x] Focus ring styling
- [x] Disabled state (visual + ARIA)

#### Consumer Must Provide
- [ ] aria-label for icon-only usage
- [ ] Accessible label for the component
- [ ] Color contrast for custom content
- [ ] Focus management in surrounding context
```

---

## 6. DX Evaluation Criteria

Evaluate the proposed API against these DX metrics:

| Metric | Question |
|---|---|
| **Discoverability** | Can developers find the right prop without reading docs? |
| **Predictability** | Do prop names match what other components use? |
| **Minimal boilerplate** | Can the simplest use case be one line? |
| **Progressive complexity** | Can users start simple and add features incrementally? |
| **Type safety** | Do TypeScript types guide usage and catch errors? |
| **IDE experience** | Do JSDoc comments show useful hints on hover? |

---

## 7. Performance Considerations

For each component, evaluate:

- **Render cost**: Is the component likely to be rendered many times (in a list/table)?
- **Bundle size**: How many bytes does the component add?
- **CSS complexity**: Does the CSS require containment or will-change?
- **Reflow/repaint**: Does the component trigger layout shifts?
- **Animation**: Are animations CSS-only or do they require JS?

---

## 8. Requirements Document Output

After research, produce a requirements document:

```markdown
# [Component Name] Requirements

## API
[Final TypeScript interfaces with JSDoc]

## Features
- Feature 1 (priority: must)
- Feature 2 (priority: should)
- Feature 3 (priority: won't have initially)

## Accessibility
[Summary of ARIA pattern, keyboard interactions, focus management]

## CSS Variables
[List of component-specific --pm-* variables to expose]

## Interactions
[Description of hover, focus, active, disabled states]

## Responsive Behavior
[How the component adapts to different screen sizes]

## Open Questions
[Anything that needs discussion or decision]
```

Present this to the user for approval before starting implementation.
