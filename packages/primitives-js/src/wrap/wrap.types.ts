import type { SpacingScale } from "../shared.types.js"
import type { FlexAlign, FlexJustify } from "../flex/flex.types.js"

/** Wrap direction values. */
export type WrapDirection = "row" | "row-reverse"

export interface WrapClassesOptions {
  /** Gap between wrapped children using the spacing scale. */
  gap?: SpacingScale
  /** Cross-axis alignment of wrapped children. */
  align?: FlexAlign
  /** Main-axis alignment of wrapped children. */
  justify?: FlexJustify
  /** Direction of the wrapping flow. Defaults to "row". */
  direction?: WrapDirection
}

export interface WrapProps extends WrapClassesOptions {}
