/** Visual style variant for the link */
export type LinkVariant = "default" | "subtle" | "nav"

/**
 * Options for generating link CSS class names.
 * Used by both BEM (`linkClasses`) and CSS module (`linkModuleClasses`) builders.
 */
export interface LinkClassesOptions {
  /** Visual style variant. @default "default" */
  variant?: LinkVariant
  /** Whether the link represents the current page or section. @default false */
  active?: boolean
  /** Whether the link is in a disabled, non-interactive state. @default false */
  disabled?: boolean
  /** Whether the link points to an external URL (adds icon indicator). @default false */
  external?: boolean
  /** Underline style for the link. @default "auto" */
  underline?: "auto" | "always" | "hover" | "never"
}

/**
 * Full props interface for the link component.
 * Extends class options with HTML-specific attributes.
 */
export interface LinkProps extends LinkClassesOptions {
  /** The URL that the link points to. */
  href?: string
}
