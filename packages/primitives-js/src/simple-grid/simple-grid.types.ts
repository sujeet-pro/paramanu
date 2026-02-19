import type { SpacingScale } from "../shared.types.js"

/** Named minimum child widths for responsive auto-fill grids. */
export type SgridMinChildWidth = "2xs" | "xs" | "sm" | "md" | "lg" | "xl"

export interface SgridClassesOptions {
  /**
   * Minimum width for each child. Uses `auto-fill` with `minmax()`.
   * Takes priority over `columns` when both are specified.
   */
  minChildWidth?: SgridMinChildWidth
  /** Fixed number of equal-width columns. Ignored if `minChildWidth` is set. */
  columns?: 1 | 2 | 3 | 4 | 5 | 6
  /** Gap between all children using the spacing scale. */
  gap?: SpacingScale
}

export interface SgridProps extends SgridClassesOptions {}
