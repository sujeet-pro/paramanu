/** Visual variant for the backdrop overlay */
export type BackdropVariant = "default" | "transparent" | "blur"

/**
 * Options for generating backdrop CSS class names.
 * Used by both BEM (`backdropClasses`) and CSS module (`backdropModuleClasses`) builders.
 */
export interface BackdropClassesOptions {
  /** Visual variant controlling the backdrop appearance. @default "default" */
  variant?: BackdropVariant
  /** Whether the backdrop is visible (used for CSS-only state control). @default false */
  visible?: boolean
}
