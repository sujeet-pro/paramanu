/** Semantic heading level corresponding to h1-h6 HTML elements */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

/** Visual size of the heading, independent of semantic level */
export type HeadingSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"

/** Font weight options for headings */
export type HeadingWeight = "normal" | "medium" | "semibold" | "bold"

/** Text alignment options for headings */
export type HeadingAlign = "left" | "center" | "right"

/** Line height options for headings */
export type HeadingLineHeight = "tight" | "normal" | "relaxed"

/** Semantic color options for headings */
export type HeadingColor =
  | "default"
  | "muted"
  | "dimmed"
  | "primary"
  | "danger"
  | "success"
  | "warning"
  | "info"

export interface HeadingClassesOptions {
  /** Semantic heading level (1-6). Determines the HTML tag (h1-h6). Defaults to 2. */
  level?: HeadingLevel
  /** Visual size of the heading. If not set, automatically maps from the heading level. */
  size?: HeadingSize
  /** Font weight. Defaults to "bold". */
  weight?: HeadingWeight
  /** Text alignment within its container. */
  align?: HeadingAlign
  /** Line height. Defaults to "tight" for headings. */
  lineHeight?: HeadingLineHeight
  /** Truncate text with ellipsis on a single line. */
  truncate?: boolean
  /** Semantic color from the design token palette. */
  color?: HeadingColor
}
