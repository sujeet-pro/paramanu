import type { FloatClassesOptions } from "./float.types.js"

const BASE = "pm-float"

/**
 * Returns BEM class names for the float component (human-readable).
 * Used by CDN and template consumers.
 */
export function floatClasses(options: FloatClassesOptions = {}): string {
  const { placement = "top-end", offset } = options
  const classes = [BASE, `${BASE}--${placement}`]

  if (offset !== undefined) classes.push(`${BASE}--offset-${offset}`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the float component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function floatModuleClasses(
  classMap: Record<string, string>,
  options: FloatClassesOptions = {},
): string {
  const { placement = "top-end", offset } = options

  const classes = [classMap["pm-float"], classMap[`pm-float--${placement}`]]

  if (offset !== undefined) classes.push(classMap[`pm-float--offset-${offset}`])

  return classes.filter(Boolean).join(" ")
}
