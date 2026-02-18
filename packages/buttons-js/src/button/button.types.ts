/** Visual style variant for the button */
export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "outline" | "link"

/** Size preset for the button */
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl"

/**
 * Options for generating button CSS class names.
 * Used by both BEM (`buttonClasses`) and CSS module (`buttonModuleClasses`) builders.
 */
export interface ButtonClassesOptions {
  /** Visual style variant. @default "primary" */
  variant?: ButtonVariant
  /** Size preset controlling padding and font-size. @default "md" */
  size?: ButtonSize
  /** Whether the button is in a disabled state. @default false */
  disabled?: boolean
  /** Whether the button should stretch to fill its container width. @default false */
  fullWidth?: boolean
  /** Whether the button is in a loading state (shows spinner). @default false */
  loading?: boolean
  /** Whether the button is in an active/pressed visual state. @default false */
  active?: boolean
}

/**
 * Full props interface for the button component.
 * Extends class options with HTML-specific attributes.
 */
export interface ButtonProps extends ButtonClassesOptions {
  /** The HTML button type attribute. @default "button" */
  type?: "button" | "submit" | "reset"
  /** Text to display alongside the spinner when loading. */
  loadingText?: string
  /** Placement of the spinner relative to the button text. @default "start" */
  spinnerPlacement?: "start" | "end"
}
