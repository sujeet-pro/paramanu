import type { StackClassesOptions } from "./stack.types.js"

const BASE = "pm-stack"

/**
 * Returns BEM class names for the stack component (human-readable).
 * Used by CDN and template consumers.
 */
export function stackClasses(options: StackClassesOptions = {}): string {
  const { direction = "vertical", gap, align, justify, separator } = options
  const classes = [BASE, `${BASE}--${direction}`]

  if (align) classes.push(`${BASE}--align-${align}`)
  if (justify) classes.push(`${BASE}--justify-${justify}`)
  if (gap !== undefined) classes.push(`${BASE}--gap-${gap}`)
  if (separator) classes.push(`${BASE}--separator`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the stack component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function stackModuleClasses(
  classMap: Record<string, string>,
  options: StackClassesOptions = {},
): string {
  const { direction = "vertical", gap, align, justify, separator } = options
  const classes = [classMap["pm-stack"], classMap[`pm-stack--${direction}`]]

  if (align) classes.push(classMap[`pm-stack--align-${align}`])
  if (justify) classes.push(classMap[`pm-stack--justify-${justify}`])
  if (gap !== undefined) classes.push(classMap[`pm-stack--gap-${gap}`])
  if (separator) classes.push(classMap["pm-stack--separator"])

  return classes.filter(Boolean).join(" ")
}
