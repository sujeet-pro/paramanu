import type { IconButtonClassesOptions } from "./icon-button.types.js"

const BASE = "pm-icon-button"

/**
 * Returns BEM class names for the icon button component (human-readable).
 * Used by CDN and template consumers.
 */
export function iconButtonClasses(options: IconButtonClassesOptions = {}): string {
  const { variant = "primary", size = "md", shape = "square", disabled = false } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`, `${BASE}--${shape}`]

  if (disabled) classes.push(`${BASE}--disabled`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the icon button component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function iconButtonModuleClasses(
  classMap: Record<string, string>,
  options: IconButtonClassesOptions = {},
): string {
  const { variant = "primary", size = "md", shape = "square", disabled = false } = options

  const classes = [
    classMap["pm-icon-button"],
    classMap[`pm-icon-button--${variant}`],
    classMap[`pm-icon-button--${size}`],
    classMap[`pm-icon-button--${shape}`],
  ]

  if (disabled) classes.push(classMap["pm-icon-button--disabled"])

  return classes.filter(Boolean).join(" ")
}
