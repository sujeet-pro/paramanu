/** Number of visible lines before truncation with ellipsis */
export type TruncateLines = 1 | 2 | 3 | 4 | 5 | 6

/** Position of the ellipsis when truncating */
export type TruncatePosition = "end" | "start" | "middle"

export interface TruncateClassesOptions {
  /** Number of lines to show before truncating. Defaults to 1 (single-line ellipsis). */
  lines?: TruncateLines
  /** Where to place the ellipsis. Defaults to "end". Only "end" is supported for multi-line clamp. */
  position?: TruncatePosition
}
