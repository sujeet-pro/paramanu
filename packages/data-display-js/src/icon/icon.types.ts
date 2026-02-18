/** Size of the icon (width and height). */
export type IconSize = "xs" | "sm" | "md" | "lg" | "xl"

/**
 * Color of the icon.
 * `"inherit"` uses the parent element's `color` value.
 */
export type IconColor = "inherit" | "primary" | "neutral" | "danger" | "success"

/** Options for generating icon CSS class names. */
export interface IconClassesOptions {
  /** Width and height of the icon. @default "md" */
  size?: IconSize
  /** Icon color. @default "inherit" */
  color?: IconColor
  /** Applies a continuous rotation animation. @default false */
  spin?: boolean
}

/** Props for the Icon component. */
export interface IconProps extends IconClassesOptions {
  /**
   * Accessible label for the icon.
   * When provided, `role="img"` and `aria-label` are set.
   * When absent, `aria-hidden="true"` marks the icon as decorative.
   */
  label?: string
}
