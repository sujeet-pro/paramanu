/** Visual variant for the mark element */
export type MarkVariant = "default" | "underline" | "circle" | "filled"

/** Color for the mark styling */
export type MarkColor = "yellow" | "primary" | "danger" | "success" | "info"

export interface MarkClassesOptions {
  /** Visual variant. "default" shows a translucent yellow highlight, "underline" shows a colored bottom border, "circle" shows an outline ring, "filled" shows a solid background. Defaults to "default". */
  variant?: MarkVariant
  /** Color scheme for the mark. Defaults to "yellow". */
  color?: MarkColor
}
