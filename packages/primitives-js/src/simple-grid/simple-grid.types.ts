import type { SpacingScale } from "../shared.types.js"

/** Named minimum child widths for responsive auto-fill grids. */
export type SimpleGridMinChildWidth = "2xs" | "xs" | "sm" | "md" | "lg" | "xl"

export interface SimpleGridClassesOptions {
  /**
   * Minimum width for each child. Uses `auto-fill` with `minmax()`.
   * Takes priority over `columns` when both are specified.
   */
  minChildWidth?: SimpleGridMinChildWidth
  /** Fixed number of equal-width columns. Ignored if `minChildWidth` is set. */
  columns?: 1 | 2 | 3 | 4 | 5 | 6
  /** Gap between all children using the spacing scale. */
  gap?: SpacingScale
}

export interface SimpleGridProps extends SimpleGridClassesOptions {}
