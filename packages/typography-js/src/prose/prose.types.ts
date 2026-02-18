/** Size presets controlling base font size and spacing rhythm */
export type ProseSize = "sm" | "md" | "lg"

/** Color scheme for the prose content */
export type ProseColor = "default" | "muted"

export interface ProseClassesOptions {
  /** Base font size and spacing scale. Defaults to "md". */
  size?: ProseSize
  /** Color scheme for the prose text. Defaults to "default". */
  color?: ProseColor
  /** When true, removes vertical margin from the first and last child elements. */
  trimMargins?: boolean
}
