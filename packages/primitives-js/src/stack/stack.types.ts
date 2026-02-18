import type { SpacingScale } from "../shared.types.js"
import type { FlexAlign, FlexJustify } from "../flex/flex.types.js"

export type StackDirection = "horizontal" | "vertical"

export interface StackClassesOptions {
  direction?: StackDirection
  gap?: SpacingScale
  align?: FlexAlign
  justify?: FlexJustify
}

export interface StackProps extends StackClassesOptions {}
