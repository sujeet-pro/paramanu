/** Size controlling padding, spacing, and font sizes. */
export type EmptyStateSize = "sm" | "md" | "lg"

/** Options for generating empty state CSS class names. */
export interface EmptyStateClassesOptions {
  /** Controls padding, spacing, and font sizes. @default "md" */
  size?: EmptyStateSize
  /** Adds a dashed border around the empty state container. @default false */
  bordered?: boolean
}

/**
 * Object containing BEM class names for each empty state sub-element.
 * Typically used to display placeholder content when a list or view has no data.
 */
export interface EmptyStateClassesResult {
  /** Class for the outermost centered `<div>` wrapper. */
  root: string
  /** Class for the icon / illustration area. */
  icon: string
  /** Class for the heading text. */
  heading: string
  /** Class for the description paragraph. */
  description: string
  /** Class for the action buttons area. */
  actions: string
}

/** CSS module result (same shape). */
export interface EmptyStateModuleClassesResult {
  root: string
  icon: string
  heading: string
  description: string
  actions: string
}

/** Props for the EmptyState component. */
export interface EmptyStateProps extends EmptyStateClassesOptions {}
