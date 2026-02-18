export type CloseButtonSize = "sm" | "md" | "lg"

export interface CloseButtonClassesOptions {
  size?: CloseButtonSize
  disabled?: boolean
}

export interface CloseButtonProps extends CloseButtonClassesOptions {}
