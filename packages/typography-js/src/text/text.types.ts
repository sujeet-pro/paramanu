export type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"

export type TextWeight = "normal" | "medium" | "semibold" | "bold"

export type TextAlign = "left" | "center" | "right"

export type TextLineHeight = "tight" | "normal" | "relaxed"

export type TextTransform = "uppercase" | "lowercase" | "capitalize"

export interface TextClassesOptions {
  size?: TextSize
  weight?: TextWeight
  align?: TextAlign
  lineHeight?: TextLineHeight
  truncate?: boolean
  italic?: boolean
  transform?: TextTransform
}
