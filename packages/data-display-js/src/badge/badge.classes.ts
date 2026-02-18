import type { BadgeClassesOptions } from "./badge.types.js"

const BASE = "pm-badge"

/**
 * Returns BEM class names for the Badge component.
 *
 * Badge is a small inline status indicator rendered as a `<span>`.
 * Supports filled, outline, and subtle variants with multiple color palettes.
 * Can also be used as an overlay positioned on avatars or icons.
 *
 * @example
 * ```ts
 * badgeClasses({ variant: "subtle", color: "success", pill: true })
 * // => "pm-badge pm-badge--subtle pm-badge--md pm-badge--success pm-badge--pill"
 * ```
 */
export function badgeClasses(options: BadgeClassesOptions = {}): string {
  const { variant = "filled", size = "md", color = "primary", pill = false } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`, `${BASE}--${color}`]

  if (pill) classes.push(`${BASE}--pill`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the Badge component.
 * Used by bundled consumers who import CSS modules.
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
