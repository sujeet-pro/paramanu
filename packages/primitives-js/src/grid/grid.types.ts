import type { SpacingScale } from "../shared.types.js"
import type { FlexAlign, FlexJustify } from "../flex/flex.types.js"

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 12 | "none"

export type GridRows = 1 | 2 | 3 | 4 | 5 | 6 | "none"

export interface GridClassesOptions {
  columns?: GridColumns
  rows?: GridRows
  gap?: SpacingScale
  rowGap?: SpacingScale
  columnGap?: SpacingScale
  align?: FlexAlign
  justify?: FlexJustify
  inline?: boolean
}

export interface GridProps extends GridClassesOptions {}
