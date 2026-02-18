import type { SpacingScale } from "../shared.types.js"
import type { FlexAlign, FlexJustify } from "../flex/flex.types.js"

/** Group orientation — horizontal or vertical. */
export type GroupOrientation = "horizontal" | "vertical"

export interface GroupClassesOptions {
  /** Layout direction. Defaults to "horizontal". */
  orientation?: GroupOrientation
  /** Gap between children using the spacing scale. */
  gap?: SpacingScale
  /** Whether children should have no gap and share borders (e.g., button groups). */
  attached?: boolean
  /** Whether to allow wrapping when children overflow. */
  wrap?: boolean
  /** Cross-axis alignment of children. */
  align?: FlexAlign
  /** Main-axis alignment of children. */
  justify?: FlexJustify
  /** Whether children should grow to fill available space. */
  grow?: boolean
}

export interface GroupProps extends GroupClassesOptions {}
