export type IconButtonVariant = "primary" | "secondary" | "danger" | "ghost"

export type IconButtonSize = "sm" | "md" | "lg"

export type IconButtonShape = "square" | "circle"

export interface IconButtonClassesOptions {
  variant?: IconButtonVariant
  size?: IconButtonSize
  shape?: IconButtonShape
  disabled?: boolean
}

export interface IconButtonProps extends IconButtonClassesOptions {}
