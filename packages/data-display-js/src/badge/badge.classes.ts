import type { BadgeClassesOptions } from "./badge.types.js"

const BASE = "pm-badge"

/**
 * Returns BEM class names for the badge component (human-readable).
 * Used by CDN and template consumers.
 */
export function badgeClasses(options: BadgeClassesOptions = {}): string {
  const { variant = "filled", size = "md", color = "primary", pill = false } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`, `${BASE}--${color}`]

  if (pill) classes.push(`${BASE}--pill`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the badge component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function badgeModuleClasses(
  classMap: Record<string, string>,
  options: BadgeClassesOptions = {},
): string {
  const { variant = "filled", size = "md", color = "primary", pill = false } = options

  const classes = [
    classMap["pm-badge"],
    classMap[`pm-badge--${variant}`],
    classMap[`pm-badge--${size}`],
    classMap[`pm-badge--${color}`],
  ]

  if (pill) classes.push(classMap["pm-badge--pill"])

  return classes.filter(Boolean).join(" ")
}
