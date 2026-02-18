import type { GroupClassesOptions } from "./group.types.js"

const BASE = "pm-group"

/**
 * Returns BEM class names for the group component (human-readable).
 * Used by CDN and template consumers.
 */
export function groupClasses(options: GroupClassesOptions = {}): string {
  const { orientation = "horizontal", gap, attached, wrap, align, justify, grow } = options
  const classes = [BASE, `${BASE}--${orientation}`]

  if (attached) classes.push(`${BASE}--attached`)
  if (wrap) classes.push(`${BASE}--wrap`)
  if (grow) classes.push(`${BASE}--grow`)
  if (align) classes.push(`${BASE}--align-${align}`)
  if (justify) classes.push(`${BASE}--justify-${justify}`)
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
  const { orientation = "horizontal", gap, attached, wrap, align, justify, grow } = options
  const classes = [classMap["pm-group"], classMap[`pm-group--${orientation}`]]

  if (attached) classes.push(classMap["pm-group--attached"])
  if (wrap) classes.push(classMap["pm-group--wrap"])
  if (grow) classes.push(classMap["pm-group--grow"])
  if (align) classes.push(classMap[`pm-group--align-${align}`])
  if (justify) classes.push(classMap[`pm-group--justify-${justify}`])
  if (gap !== undefined) classes.push(classMap[`pm-group--gap-${gap}`])

  return classes.filter(Boolean).join(" ")
}
