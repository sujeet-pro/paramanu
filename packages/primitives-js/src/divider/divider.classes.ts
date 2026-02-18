import type { DividerClassesOptions } from "./divider.types.js"

const BASE = "pm-divider"

/**
 * Returns BEM class names for the divider component (human-readable).
 * Used by CDN and template consumers.
 */
export function dividerClasses(options: DividerClassesOptions = {}): string {
  const { orientation = "horizontal", variant = "solid" } = options
  const classes = [BASE, `${BASE}--${orientation}`, `${BASE}--${variant}`]

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the divider component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function dividerModuleClasses(
  classMap: Record<string, string>,
  options: DividerClassesOptions = {},
): string {
  const { orientation = "horizontal", variant = "solid" } = options

  const classes = [
    classMap["pm-divider"],
    classMap[`pm-divider--${orientation}`],
    classMap[`pm-divider--${variant}`],
  ]

  return classes.filter(Boolean).join(" ")
}
