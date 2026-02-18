import type { FabClassesOptions } from "./fab.types.js"

const BASE = "pm-fab"

/**
 * Returns BEM class names for the floating action button component (human-readable).
 * Used by CDN and template consumers.
 */
export function fabClasses(options: FabClassesOptions = {}): string {
  const {
    size = "md",
    position = "bottom-right",
    extended = false,
    disabled = false,
  } = options
  const classes = [BASE, `${BASE}--${size}`, `${BASE}--${position}`]

  if (extended) classes.push(`${BASE}--extended`)
  if (disabled) classes.push(`${BASE}--disabled`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the floating action button component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function fabModuleClasses(
  classMap: Record<string, string>,
  options: FabClassesOptions = {},
): string {
  const {
    size = "md",
    position = "bottom-right",
    extended = false,
    disabled = false,
  } = options

  const classes = [
    classMap["pm-fab"],
    classMap[`pm-fab--${size}`],
    classMap[`pm-fab--${position}`],
  ]

  if (extended) classes.push(classMap["pm-fab--extended"])
  if (disabled) classes.push(classMap["pm-fab--disabled"])

  return classes.filter(Boolean).join(" ")
}
