import type { IconClassesOptions } from "./icon.types.js"

const BASE = "pm-icon"

/**
 * Returns BEM class names for the icon component (human-readable).
 * Used by CDN and template consumers.
 */
export function iconClasses(options: IconClassesOptions = {}): string {
  const { size = "md", color = "inherit", spin = false } = options
  const classes = [BASE, `${BASE}--${size}`, `${BASE}--${color}`]

  if (spin) classes.push(`${BASE}--spin`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the icon component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function iconModuleClasses(
  classMap: Record<string, string>,
  options: IconClassesOptions = {},
): string {
  const { size = "md", color = "inherit", spin = false } = options

  const classes = [
    classMap["pm-icon"],
    classMap[`pm-icon--${size}`],
    classMap[`pm-icon--${color}`],
  ]

  if (spin) classes.push(classMap["pm-icon--spin"])

  return classes.filter(Boolean).join(" ")
}
