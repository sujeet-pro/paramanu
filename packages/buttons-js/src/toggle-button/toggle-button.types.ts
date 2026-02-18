export type ToggleButtonVariant = "default" | "outline"

export type ToggleButtonSize = "sm" | "md" | "lg"

export interface ToggleButtonClassesOptions {
  variant?: ToggleButtonVariant
  size?: ToggleButtonSize
  pressed?: boolean
  disabled?: boolean
}

export interface ToggleButtonProps extends ToggleButtonClassesOptions {}
