export type BadgeVariant = "filled" | "outline" | "subtle"

export type BadgeSize = "sm" | "md" | "lg"

export type BadgeColor = "primary" | "neutral" | "danger" | "success"

export interface BadgeClassesOptions {
  variant?: BadgeVariant
  size?: BadgeSize
  color?: BadgeColor
  pill?: boolean
}

export interface BadgeProps extends BadgeClassesOptions {}
