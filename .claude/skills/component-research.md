---
description: Apply when researching a new component before implementation, comparing design system APIs, exploring accessibility requirements, or designing the API surface for a Paramanu component. Auto-use when the user mentions researching, comparing, or exploring how a component works across design systems.
---

# Component Research

When researching a component for implementation in Paramanu, follow this systematic process.

## Step 1: Survey Popular Design Systems

Research how these design systems implement the component. Focus on their API, feature set, and accessibility approach:

### Tier 1 - Major Design Systems (always check)
1. **Ant Design** (antd) - https://ant.design/components/
2. **Material UI** (MUI) - https://mui.com/material-ui/
3. **Carbon Design System** (IBM) - https://carbondesignsystem.com/components/
4. **Chakra UI** - https://chakra-ui.com/docs/components/
5. **Radix UI** - https://www.radix-ui.com/primitives
6. **Mantine** - https://mantine.dev/

### Tier 2 - Reference Implementations (check for specific patterns)
7. **Headless UI** - https://headlessui.com/
8. **shadcn/ui** - https://ui.shadcn.com/docs/components
9. **React Aria (Adobe)** - https://react-aria.adobe.com/
10. **Ariakit** - https://ariakit.org/
11. **Base UI** (MUI headless) - https://mui.com/base-ui/
12. **Ark UI** - https://ark-ui.com/
13. **Kobalte** (Solid) - for API design inspiration
14. **Spectrum (Adobe)** - https://spectrum.adobe.com/

For each system, document:
- Props/API surface
- Variants and sizes offered
- Compound component pattern vs flat props
- Controlled vs uncontrolled behavior
- Accessibility features
- Notable missing features or unique features

## Step 2: Identify the Feature Set

Create a comparison matrix:

```markdown
| Feature | Ant | MUI | Carbon | Chakra | Radix | Mantine | Paramanu Decision |
|---------|-----|-----|--------|--------|-------|---------|-------------------|
| Variants | 5 | 3 | 2 | 6 | N/A | 6 | ? |
| Sizes | 3 | 3 | 3 | 4 | N/A | 5 | ? |
| Loading state | Yes | Yes | Yes | Yes | No | Yes | ? |
| Icon support | Yes | Yes | Yes | Yes | No | Yes | ? |
| ... | | | | | | | |
```

Decide the Paramanu feature set by:
1. **Must have** - Features in 4+ of the 6 Tier 1 systems
2. **Should have** - Features in 2-3 Tier 1 systems that add clear value
3. **Won't have (initially)** - Niche features, can be added later

## Step 3: Design the API

Paramanu API design principles:

### DX-Friendly API
1. **Sensible defaults** - Most common usage should require minimal props
2. **Flat props for simple cases** - Avoid nested objects for common config
3. **Compound components for complex cases** - Use sub-components when composition is needed
4. **Consistent naming** - Follow existing patterns (variant, size, disabled, fullWidth)
5. **Type safety** - Union types for constrained values, not `string`

### API Naming Conventions (follow existing Button pattern)
```typescript
// Variants: always a union type called `<Component>Variant`
export type AlertVariant = "info" | "success" | "warning" | "danger"

// Sizes: always a union type called `<Component>Size`
export type AlertSize = "sm" | "md" | "lg"

// Options interface for class builder
export interface AlertClassesOptions {
  variant?: AlertVariant
  size?: AlertSize
  // ... modifiers as boolean props
}

// Full props (extends options)
export interface AlertProps extends AlertClassesOptions {
  // Additional non-visual props
}
```

### Core Package API Pattern
The core package always exports:
1. `<component>Classes(options)` - Returns BEM class string
2. `<component>ModuleClasses(classMap, options)` - Returns CSS module class string
3. Types: `<Component>Variant`, `<Component>Size`, `<Component>ClassesOptions`, `<Component>Props`

### React Package API Pattern
```typescript
export interface React<Component>Props
  extends <Component>Props,
    Omit<React.<Element>HTMLAttributes<HTML<Element>Element>, "conflicting-props"> {
  children?: React.ReactNode
}

export const <Component> = forwardRef<HTML<Element>Element, React<Component>Props>(...)
```

## Step 4: Research Accessibility Requirements

For every component, research and document:

1. **WAI-ARIA Authoring Practices** - Check https://www.w3.org/WAI/ARIA/apg/patterns/
   - Required ARIA roles
   - Required ARIA states and properties
   - Keyboard interaction pattern

2. **WCAG 2.2 AA Requirements**
   - Color contrast requirements
   - Target size requirements (minimum 24x24px for AA)
   - Focus indicator requirements
   - Motion/animation requirements

3. **How reference implementations handle a11y**
   - Check React Aria (most thorough a11y implementation)
   - Check Radix UI (good a11y patterns)
   - Note any a11y features that are commonly missed

Document the findings as:
```markdown
### Accessibility Requirements for [Component]

#### ARIA Pattern
- Role: `role="<role>"`
- States: `aria-expanded`, `aria-selected`, etc.
- Properties: `aria-labelledby`, `aria-describedby`, etc.

#### Keyboard Interactions
| Key | Action |
|-----|--------|
| ... | ... |

#### Focus Management
- Focus order: ...
- Focus trap: yes/no
- Focus restoration: ...

#### What Paramanu Handles
- [x] Correct semantic element
- [x] ARIA attributes
- [x] Keyboard navigation
- [x] Focus ring

#### What Consumers Must Handle
- [ ] Provide accessible label for ...
- [ ] Ensure color contrast of custom content
```

## Step 5: Finalize Requirements

Create a requirements document:

```markdown
# [Component Name] Requirements

## API
[Final TypeScript interfaces]

## Features
- Feature 1 (priority: must)
- Feature 2 (priority: should)

## Accessibility
[Summary from Step 4]

## CSS Variables
[List of component-specific CSS variables]

## Open Questions
[Anything that needs discussion]
```
