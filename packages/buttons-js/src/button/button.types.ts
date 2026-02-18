export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost"

export type ButtonSize = "sm" | "md" | "lg"

export interface ButtonClassesOptions {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  fullWidth?: boolean
}

export interface ButtonProps extends ButtonClassesOptions {
  type?: "button" | "submit" | "reset"
}
