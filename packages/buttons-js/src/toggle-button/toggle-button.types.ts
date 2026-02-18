/** Visual style variant for the toggle button */
export type ToggleButtonVariant = "default" | "outline"

/** Size preset for the toggle button */
export type ToggleButtonSize = "xs" | "sm" | "md" | "lg" | "xl"

/**
 * Options for generating toggle button CSS class names.
 * Used by both BEM (`toggleButtonClasses`) and CSS module (`toggleButtonModuleClasses`) builders.
 */
export interface ToggleButtonClassesOptions {
  /** Visual style variant. @default "default" */
  variant?: ToggleButtonVariant
  /** Size preset controlling padding and font-size. @default "md" */
  size?: ToggleButtonSize
  /** Whether the toggle is currently in the pressed/on state. @default false */
  pressed?: boolean
  /** Whether the toggle is in a disabled state. @default false */
  disabled?: boolean
  /** Whether the toggle should stretch to fill its container width. @default false */
  fullWidth?: boolean
}

/**
 * Full props interface for the toggle button component.
 * A toggle button is a two-state button (on/off) that uses `aria-pressed`.
 */
export interface ToggleButtonProps extends ToggleButtonClassesOptions {
  /** The value associated with this toggle button (used by ToggleGroup). */
  value?: string
}
