import type { SpacingScale } from "../shared.types.js"

export type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse"

export type FlexAlign = "start" | "center" | "end" | "stretch" | "baseline"

export type FlexJustify = "start" | "center" | "end" | "between" | "around" | "evenly"

export type FlexWrap = "wrap" | "nowrap" | "wrap-reverse"

export interface FlexClassesOptions {
  direction?: FlexDirection
  align?: FlexAlign
  justify?: FlexJustify
  wrap?: FlexWrap
  gap?: SpacingScale
  inline?: boolean
}

export interface FlexProps extends FlexClassesOptions {}
