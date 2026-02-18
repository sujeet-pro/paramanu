import type { SpacingScale } from "../shared.types.js"

/** Display CSS property values supported by Box. */
export type BoxDisplay =
  | "block"
  | "inline-block"
  | "inline"
  | "flex"
  | "inline-flex"
  | "grid"
  | "inline-grid"
  | "none"

/** Overflow CSS property values supported by Box. */
export type BoxOverflow = "visible" | "hidden" | "scroll" | "auto"

/** Position CSS property values supported by Box. */
export type BoxPosition = "static" | "relative" | "absolute" | "fixed" | "sticky"

export interface BoxClassesOptions {
  /** CSS display property. */
  display?: BoxDisplay
  /** Padding on all sides using the spacing scale. */
  p?: SpacingScale
  /** Horizontal (inline) padding using the spacing scale. */
  px?: SpacingScale
  /** Vertical (block) padding using the spacing scale. */
  py?: SpacingScale
  /** Margin on all sides using the spacing scale. */
  m?: SpacingScale
  /** Horizontal (inline) margin using the spacing scale. */
  mx?: SpacingScale
  /** Vertical (block) margin using the spacing scale. */
  my?: SpacingScale
  /** Overflow behavior of the box content. */
  overflow?: BoxOverflow
  /** CSS position property. */
  position?: BoxPosition
}

export interface BoxProps extends BoxClassesOptions {
  /** The HTML element to render. Defaults to "div". */
  as?: string
}
