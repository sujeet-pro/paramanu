import type { InlineMessageClassesOptions } from "./inline-message.types.js"

const BASE = "pm-inline-message"

/** Structured class names for the inline message component and its sub-elements. */
export interface InlineMessageClassesResult {
  /** Root element class names. */
  root: string
  /** Icon container class. */
  icon: string
  /** Content wrapper class. */
  content: string
}

/**
 * Returns BEM class names for the inline message component (human-readable).
 * Used by CDN and template consumers.
 *
 * @example
 * ```ts
 * const classes = inlineMessageClasses({ variant: "danger", size: "sm" })
 * // classes.root => "pm-inline-message pm-inline-message--danger pm-inline-message--sm"
 * ```
 */
export function inlineMessageClasses(
  options: InlineMessageClassesOptions = {},
): InlineMessageClassesResult {
  const { variant = "info", size = "md" } = options
  const rootClasses = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`]

  return {
    root: rootClasses.join(" "),
    icon: `${BASE}__icon`,
    content: `${BASE}__content`,
  }
}

/**
 * Returns CSS module class names for the inline message component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function inlineMessageModuleClasses(
  classMap: Record<string, string>,
  options: InlineMessageClassesOptions = {},
): InlineMessageClassesResult {
  const { variant = "info", size = "md" } = options

  const rootClasses = [
    classMap["pm-inline-message"],
    classMap[`pm-inline-message--${variant}`],
    classMap[`pm-inline-message--${size}`],
  ]

  return {
    root: rootClasses.filter(Boolean).join(" "),
    icon: classMap["pm-inline-message__icon"] ?? "",
    content: classMap["pm-inline-message__content"] ?? "",
  }
}
