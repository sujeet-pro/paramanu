import type { SpacingScale } from "../shared.types.js"
import type { FlexAlign, FlexJustify } from "../flex/flex.types.js"

export type WrapDirection = "row" | "row-reverse"

export interface WrapClassesOptions {
  gap?: SpacingScale
  align?: FlexAlign
  justify?: FlexJustify
  direction?: WrapDirection
}

export interface WrapProps extends WrapClassesOptions {}
