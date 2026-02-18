import type { InlineMessageClassesOptions } from "./inline-message.types.js"

const BASE = "pm-inline-message"

/**
 * Returns BEM class names for the inline message component (human-readable).
 * Used by CDN and template consumers.
 */
export function inlineMessageClasses(options: InlineMessageClassesOptions = {}): string {
  const { variant = "info" } = options
  const classes = [BASE, `${BASE}--${variant}`]

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the inline message component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function inlineMessageModuleClasses(
  classMap: Record<string, string>,
  options: InlineMessageClassesOptions = {},
): string {
  const { variant = "info" } = options

  const classes = [classMap["pm-inline-message"], classMap[`pm-inline-message--${variant}`]]

  return classes.filter(Boolean).join(" ")
}
