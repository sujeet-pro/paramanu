export type IconSize = "xs" | "sm" | "md" | "lg" | "xl"

export type IconColor = "inherit" | "primary" | "neutral" | "danger" | "success"

export interface IconClassesOptions {
  size?: IconSize
  color?: IconColor
  spin?: boolean
}

export interface IconProps extends IconClassesOptions {
  label?: string
}
