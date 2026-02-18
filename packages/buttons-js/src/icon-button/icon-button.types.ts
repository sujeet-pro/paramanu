/** Visual style variant for the icon button */
export type IconButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "outline"

/** Size preset for the icon button */
export type IconButtonSize = "xs" | "sm" | "md" | "lg" | "xl"

/** Shape of the icon button */
export type IconButtonShape = "square" | "circle"

/**
 * Options for generating icon button CSS class names.
 * Used by both BEM (`iconButtonClasses`) and CSS module (`iconButtonModuleClasses`) builders.
 */
export interface IconButtonClassesOptions {
  /** Visual style variant. @default "primary" */
  variant?: IconButtonVariant
  /** Size preset controlling dimensions. @default "md" */
  size?: IconButtonSize
  /** Button shape. @default "square" */
  shape?: IconButtonShape
  /** Whether the button is in a disabled state. @default false */
  disabled?: boolean
  /** Whether the button is in a loading state. @default false */
  loading?: boolean
  /** Whether the button is in an active/pressed visual state. @default false */
  active?: boolean
}

/**
 * Full props interface for the icon button component.
 * Extends class options with HTML-specific attributes.
 */
export interface IconButtonProps extends IconButtonClassesOptions {
  /**
   * Accessible label for the icon button (required for a11y).
   * Since icon buttons have no visible text, an aria-label is mandatory.
   */
  "aria-label": string
}
