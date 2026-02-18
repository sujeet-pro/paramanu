import type { ToggleButtonClassesOptions } from "./toggle-button.types.js"

const BASE = "pm-toggle-button"

/**
 * Returns BEM class names for the toggle button component (human-readable).
 * Used by CDN and template consumers.
 */
export function toggleButtonClasses(options: ToggleButtonClassesOptions = {}): string {
  const { variant = "default", size = "md", pressed = false, disabled = false } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`]

  if (pressed) classes.push(`${BASE}--pressed`)
  if (disabled) classes.push(`${BASE}--disabled`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the toggle button component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function toggleButtonModuleClasses(
  classMap: Record<string, string>,
  options: ToggleButtonClassesOptions = {},
): string {
  const { variant = "default", size = "md", pressed = false, disabled = false } = options

  const classes = [
    classMap["pm-toggle-button"],
    classMap[`pm-toggle-button--${variant}`],
    classMap[`pm-toggle-button--${size}`],
  ]

  if (pressed) classes.push(classMap["pm-toggle-button--pressed"])
  if (disabled) classes.push(classMap["pm-toggle-button--disabled"])

  return classes.filter(Boolean).join(" ")
}
