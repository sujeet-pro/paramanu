import type { GroupClassesOptions } from "./group.types.js"

const BASE = "pm-group"

/**
 * Returns BEM class names for the group component (human-readable).
 * Used by CDN and template consumers.
 */
export function groupClasses(options: GroupClassesOptions = {}): string {
  const { orientation = "horizontal", gap, attached } = options
  const classes = [BASE, `${BASE}--${orientation}`]

  if (attached) classes.push(`${BASE}--attached`)
  if (gap !== undefined) classes.push(`${BASE}--gap-${gap}`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the group component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function groupModuleClasses(
  classMap: Record<string, string>,
  options: GroupClassesOptions = {},
): string {
  const { orientation = "horizontal", gap, attached } = options
  const classes = [classMap["pm-group"], classMap[`pm-group--${orientation}`]]

  if (attached) classes.push(classMap["pm-group--attached"])
  if (gap !== undefined) classes.push(classMap[`pm-group--gap-${gap}`])

  return classes.filter(Boolean).join(" ")
}
