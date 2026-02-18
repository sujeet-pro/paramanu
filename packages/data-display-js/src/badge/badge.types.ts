/** Visual style variant for the badge. */
export type BadgeVariant = "filled" | "outline" | "subtle"

/** Size controlling padding and font size. */
export type BadgeSize = "sm" | "md" | "lg"

/** Color palette applied to the badge. */
export type BadgeColor = "primary" | "neutral" | "danger" | "success"

/** Options for generating badge CSS class names. */
export interface BadgeClassesOptions {
  /** Visual style variant. @default "filled" */
  variant?: BadgeVariant
  /** Controls padding and font size. @default "md" */
  size?: BadgeSize
  /** Color palette. @default "primary" */
  color?: BadgeColor
  /** Uses fully rounded corners (pill shape). @default false */
  pill?: boolean
}

/** Props for the Badge component. */
export interface BadgeProps extends BadgeClassesOptions {}
