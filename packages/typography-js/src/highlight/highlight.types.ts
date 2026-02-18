/** Color options for the highlight background */
export type HighlightColor = "primary" | "danger" | "success" | "warning" | "info" | "neutral"

/** Visual style of the highlight */
export type HighlightVariant = "filled" | "outline" | "text"

export interface HighlightClassesOptions {
  /** Background color of the highlighted text. Defaults to "primary". */
  color?: HighlightColor
  /** Visual variant. "filled" shows a background, "outline" shows a border, "text" changes only text color. Defaults to "filled". */
  variant?: HighlightVariant
}
