import type { InlineMsgClassesOptions } from "./inline-message.types.js"

const BASE = "pm-inline-msg"

/** Structured class names for the inline message component and its sub-elements. */
export interface InlineMsgClassesResult {
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
 * const classes = inlineMsgClasses({ variant: "danger", size: "sm" })
 * // classes.root => "pm-inline-msg pm-inline-msg--danger pm-inline-msg--sm"
 * ```
 */
export function inlineMsgClasses(options: InlineMsgClassesOptions = {}): InlineMsgClassesResult {
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
export function inlineMsgModuleClasses(
  classMap: Record<string, string>,
  options: InlineMsgClassesOptions = {},
): InlineMsgClassesResult {
  const { variant = "info", size = "md" } = options

  const rootClasses = [
    classMap["pm-inline-msg"],
    classMap[`pm-inline-msg--${variant}`],
    classMap[`pm-inline-msg--${size}`],
  ]

  return {
    root: rootClasses.filter(Boolean).join(" "),
    icon: classMap["pm-inline-msg__icon"] ?? "",
    content: classMap["pm-inline-msg__content"] ?? "",
  }
}
