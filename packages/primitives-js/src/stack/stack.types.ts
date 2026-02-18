import type { SpacingScale } from "../shared.types.js"
import type { FlexAlign, FlexJustify } from "../flex/flex.types.js"

/** Stack direction — either vertical (column) or horizontal (row). */
export type StackDirection = "horizontal" | "vertical"

export interface StackClassesOptions {
  /** Stack direction. Defaults to "vertical". */
  direction?: StackDirection
  /** Gap between children using the spacing scale. */
  gap?: SpacingScale
  /** Cross-axis alignment of children. */
  align?: FlexAlign
  /** Main-axis alignment of children. */
  justify?: FlexJustify
  /** Whether to show dividers between children. */
  separator?: boolean
}

export interface StackProps extends StackClassesOptions {}
