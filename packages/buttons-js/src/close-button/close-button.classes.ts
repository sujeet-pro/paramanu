import type { CloseButtonClassesOptions } from "./close-button.types.js"

const BASE = "pm-close-button"

/**
 * Returns BEM class names for the close button component (human-readable).
 * Used by CDN and template consumers.
 */
export function closeButtonClasses(options: CloseButtonClassesOptions = {}): string {
  const { size = "md", disabled = false } = options
  const classes = [BASE, `${BASE}--${size}`]

  if (disabled) classes.push(`${BASE}--disabled`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the close button component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function closeButtonModuleClasses(
  classMap: Record<string, string>,
  options: CloseButtonClassesOptions = {},
): string {
  const { size = "md", disabled = false } = options

  const classes = [classMap["pm-close-button"], classMap[`pm-close-button--${size}`]]

  if (disabled) classes.push(classMap["pm-close-button--disabled"])

  return classes.filter(Boolean).join(" ")
}
