/** Font size for code elements */
export type CodeSize = "xs" | "sm" | "md" | "lg"

/** Visual variant for code display */
export type CodeVariant = "default" | "outline"

/** Semantic color for the code background/border */
export type CodeColor = "neutral" | "primary" | "danger" | "success" | "warning" | "info"

export interface CodeClassesOptions {
  /** When true, renders as a code block (`<pre><code>`) instead of inline `<code>`. Defaults to false. */
  block?: boolean
  /** Font size of the code text. */
  size?: CodeSize
  /** Visual variant controlling background and border style. Defaults to "default". */
  variant?: CodeVariant
  /** Semantic color for the code element. Defaults to "neutral". */
  color?: CodeColor
  /** Whether to show line numbers in block mode. */
  withLineNumbers?: boolean
  /** Whether to show a copy button in block mode. */
  withCopyButton?: boolean
  /** Language hint for syntax highlighting (CSS class only, no runtime highlighting). */
  language?: string
}
