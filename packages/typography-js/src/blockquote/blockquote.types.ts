/** Visual variant of the blockquote */
export type BlockquoteVariant = "default" | "accent" | "filled"

/** Size presets for the blockquote */
export type BlockquoteSize = "sm" | "md" | "lg"

/** Accent color for the border and filled variant */
export type BlockquoteColor = "primary" | "neutral" | "danger" | "success" | "warning" | "info"

export interface BlockquoteClassesOptions {
  /** Visual variant. "default" shows a left border, "accent" uses a colored border, "filled" adds a background. Defaults to "default". */
  variant?: BlockquoteVariant
  /** Size controlling padding and font size. Defaults to "md". */
  size?: BlockquoteSize
  /** Accent color for the left border and filled background. Defaults to "primary". */
  color?: BlockquoteColor
  /** Whether the blockquote includes a cite attribution line. */
  withCite?: boolean
  /** Whether to show a decorative quotation mark icon. */
  withIcon?: boolean
}
