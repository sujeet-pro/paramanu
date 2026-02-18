import type { CenterClassesOptions } from "./center.types.js"

const BASE = "pm-center"

/**
 * Returns BEM class names for the center component (human-readable).
 * Used by CDN and template consumers.
 */
export function centerClasses(options: CenterClassesOptions = {}): string {
  const { inline = false } = options
  const classes = [BASE]

  if (inline) classes.push(`${BASE}--inline`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the center component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function centerModuleClasses(
  classMap: Record<string, string>,
  options: CenterClassesOptions = {},
): string {
  const { inline = false } = options

  const classes = [classMap["pm-center"]]

  if (inline) classes.push(classMap["pm-center--inline"])

  return classes.filter(Boolean).join(" ")
}
