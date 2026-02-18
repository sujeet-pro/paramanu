import type { ButtonClassesOptions } from "./button.types.js"

const BASE = "pm-button"

/**
 * Returns BEM class names for the button component (human-readable).
 * Used by CDN and template consumers.
 */
export function buttonClasses(options: ButtonClassesOptions = {}): string {
  const { variant = "primary", size = "md", disabled = false, fullWidth = false } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`]

  if (disabled) classes.push(`${BASE}--disabled`)
  if (fullWidth) classes.push(`${BASE}--full-width`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the button component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function buttonModuleClasses(
  classMap: Record<string, string>,
  options: ButtonClassesOptions = {},
): string {
  const { variant = "primary", size = "md", disabled = false, fullWidth = false } = options

  const classes = [
    classMap["pm-button"],
    classMap[`pm-button--${variant}`],
    classMap[`pm-button--${size}`],
  ]

  if (disabled) classes.push(classMap["pm-button--disabled"])
  if (fullWidth) classes.push(classMap["pm-button--full-width"])

  return classes.filter(Boolean).join(" ")
}
