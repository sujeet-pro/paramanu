import type { SpacingScale } from "../shared.types.js"

/** Flex direction values. */
export type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse"

/** Flex align-items values (shorthand names). */
export type FlexAlign = "start" | "center" | "end" | "stretch" | "baseline"

/** Flex justify-content values (shorthand names). */
export type FlexJustify = "start" | "center" | "end" | "between" | "around" | "evenly"

/** Flex wrap values. */
export type FlexWrap = "wrap" | "nowrap" | "wrap-reverse"

export interface FlexClassesOptions {
  /** The flex-direction property. Defaults to "row". */
  direction?: FlexDirection
  /** The align-items property. */
  align?: FlexAlign
  /** The justify-content property. */
  justify?: FlexJustify
  /** The flex-wrap property. */
  wrap?: FlexWrap
  /** Gap between children using the spacing scale. */
  gap?: SpacingScale
  /** Render as inline-flex instead of flex. */
  inline?: boolean
}

export interface FlexProps extends FlexClassesOptions {}
