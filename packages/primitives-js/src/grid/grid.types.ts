import type { SpacingScale } from "../shared.types.js"
import type { FlexAlign, FlexJustify } from "../flex/flex.types.js"

/** Supported column counts. */
export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "none"

/** Supported row counts. */
export type GridRows = 1 | 2 | 3 | 4 | 5 | 6 | "none"

/** Grid auto-flow direction. */
export type GridFlow = "row" | "column" | "dense" | "row-dense" | "column-dense"

export interface GridClassesOptions {
  /** Number of grid columns. Maps to `grid-template-columns: repeat(N, minmax(0, 1fr))`. */
  columns?: GridColumns
  /** Number of grid rows. Maps to `grid-template-rows: repeat(N, minmax(0, 1fr))`. */
  rows?: GridRows
  /** Gap between all children using the spacing scale. */
  gap?: SpacingScale
  /** Row gap using the spacing scale. Overrides `gap` for row axis. */
  rowGap?: SpacingScale
  /** Column gap using the spacing scale. Overrides `gap` for column axis. */
  columnGap?: SpacingScale
  /** Cross-axis alignment of grid items (align-items). */
  align?: FlexAlign
  /** Main-axis alignment of grid content (justify-content). */
  justify?: FlexJustify
  /** Render as inline-grid instead of grid. */
  inline?: boolean
  /** Grid auto-flow direction. */
  flow?: GridFlow
}

export interface GridProps extends GridClassesOptions {}
