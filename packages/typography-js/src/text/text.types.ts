/** Available text sizes mapping to design token font sizes */
export type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"

/** Available font weight options */
export type TextWeight = "normal" | "medium" | "semibold" | "bold"

/** Text alignment options */
export type TextAlign = "left" | "center" | "right" | "justify"

/** Line height options mapping to design token line heights */
export type TextLineHeight = "tight" | "normal" | "relaxed"

/** Text transform options for controlling capitalization */
export type TextTransform = "uppercase" | "lowercase" | "capitalize" | "none"

/** Text decoration options */
export type TextDecoration = "underline" | "line-through" | "none"

/** Semantic color options from the design token palette */
export type TextColor =
  | "default"
  | "muted"
  | "dimmed"
  | "primary"
  | "danger"
  | "success"
  | "warning"
  | "info"

/** Number of lines to clamp before showing ellipsis. Use 1 for single-line truncation. */
export type TextLineClamp = 1 | 2 | 3 | 4 | 5 | 6

export interface TextClassesOptions {
  /** Font size from the design token scale. Defaults to inheriting from parent. */
  size?: TextSize
  /** Font weight. Defaults to inheriting from parent. */
  weight?: TextWeight
  /** Text alignment within its container. */
  align?: TextAlign
  /** Line height controlling vertical rhythm. */
  lineHeight?: TextLineHeight
  /** Single-line truncation with ellipsis. Shorthand for `lineClamp: 1`. */
  truncate?: boolean
  /** Multi-line truncation. Truncates text after the specified number of lines. */
  lineClamp?: TextLineClamp
  /** Renders the text in italic style. */
  italic?: boolean
  /** Text transform for controlling capitalization. */
  transform?: TextTransform
  /** Text decoration such as underline or strikethrough. */
  decoration?: TextDecoration
  /** Semantic color from the design token palette. Defaults to "default". */
  color?: TextColor
  /** When true, the text inherits font styles (size, family, weight, line-height) from its parent. */
  inherit?: boolean
  /** Controls whether the element is rendered inline (span-like) or block (p-like). */
  inline?: boolean
}
