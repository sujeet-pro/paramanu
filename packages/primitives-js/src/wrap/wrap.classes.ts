import type { WrapClassesOptions } from "./wrap.types.js"

const BASE = "pm-wrap"

/**
 * Returns BEM class names for the wrap component (human-readable).
 * Used by CDN and template consumers.
 */
export function wrapClasses(options: WrapClassesOptions = {}): string {
  const { gap, align, justify, direction } = options
  const classes = [BASE]

  if (direction === "row-reverse") classes.push(`${BASE}--row-reverse`)
  if (align) classes.push(`${BASE}--align-${align}`)
  if (justify) classes.push(`${BASE}--justify-${justify}`)
  if (gap !== undefined) classes.push(`${BASE}--gap-${gap}`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the wrap component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function wrapModuleClasses(
  classMap: Record<string, string>,
  options: WrapClassesOptions = {},
): string {
  const { gap, align, justify, direction } = options
  const classes = [classMap["pm-wrap"]]

  if (direction === "row-reverse") classes.push(classMap["pm-wrap--row-reverse"])
  if (align) classes.push(classMap[`pm-wrap--align-${align}`])
  if (justify) classes.push(classMap[`pm-wrap--justify-${justify}`])
  if (gap !== undefined) classes.push(classMap[`pm-wrap--gap-${gap}`])

  return classes.filter(Boolean).join(" ")
}
