/** Size preset for the back-to-top button */
export type BttSize = "sm" | "md" | "lg"

/** Position of the back-to-top button on screen */
export type BttPosition = "bottom-right" | "bottom-left" | "bottom-center"

/**
 * Options for generating back-to-top button CSS class names.
 * Used by both BEM (`bttClasses`) and CSS module (`bttModuleClasses`) builders.
 */
export interface BttClassesOptions {
  /** Size preset controlling dimensions. @default "md" */
  size?: BttSize
  /** Fixed position on screen. @default "bottom-right" */
  position?: BttPosition
  /** Whether the button is currently visible. @default true */
  visible?: boolean
}

/**
 * Full props interface for the back-to-top component.
 * Renders a fixed-position button that scrolls the page to the top.
 */
export interface BttProps extends BttClassesOptions {}
