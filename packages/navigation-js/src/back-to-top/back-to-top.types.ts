/** Size preset for the back-to-top button */
export type BackToTopSize = "sm" | "md" | "lg"

/** Position of the back-to-top button on screen */
export type BackToTopPosition = "bottom-right" | "bottom-left" | "bottom-center"

/**
 * Options for generating back-to-top button CSS class names.
 * Used by both BEM (`backToTopClasses`) and CSS module (`backToTopModuleClasses`) builders.
 */
export interface BackToTopClassesOptions {
  /** Size preset controlling dimensions. @default "md" */
  size?: BackToTopSize
  /** Fixed position on screen. @default "bottom-right" */
  position?: BackToTopPosition
  /** Whether the button is currently visible. @default true */
  visible?: boolean
}

/**
 * Full props interface for the back-to-top component.
 * Renders a fixed-position button that scrolls the page to the top.
 */
export interface BackToTopProps extends BackToTopClassesOptions {}
