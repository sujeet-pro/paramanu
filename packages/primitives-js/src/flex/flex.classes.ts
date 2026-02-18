import type { FlexClassesOptions } from "./flex.types.js"

const BASE = "pm-flex"

const DIRECTION_MAP: Record<string, string> = {
  column: `${BASE}--col`,
  "row-reverse": `${BASE}--row-reverse`,
  "column-reverse": `${BASE}--col-reverse`,
}

/**
 * Returns BEM class names for the flex component (human-readable).
 * Used by CDN and template consumers.
 */
export function flexClasses(options: FlexClassesOptions = {}): string {
  const { direction, align, justify, wrap, gap, inline } = options
  const classes = [BASE]

  if (inline) classes.push(`${BASE}--inline`)
  if (direction && direction !== "row") {
    const mapped = DIRECTION_MAP[direction]
    if (mapped) classes.push(mapped)
  }
  if (align) classes.push(`${BASE}--align-${align}`)
  if (justify) classes.push(`${BASE}--justify-${justify}`)
  if (wrap) classes.push(`${BASE}--${wrap}`)
  if (gap !== undefined) classes.push(`${BASE}--gap-${gap}`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the flex component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function flexModuleClasses(
  classMap: Record<string, string>,
  options: FlexClassesOptions = {},
): string {
  const { direction, align, justify, wrap, gap, inline } = options
  const classes = [classMap["pm-flex"]]

  if (inline) classes.push(classMap["pm-flex--inline"])
  if (direction && direction !== "row") {
    const mapped = DIRECTION_MAP[direction]
    if (mapped) classes.push(classMap[mapped])
  }
  if (align) classes.push(classMap[`pm-flex--align-${align}`])
  if (justify) classes.push(classMap[`pm-flex--justify-${justify}`])
  if (wrap) classes.push(classMap[`pm-flex--${wrap}`])
  if (gap !== undefined) classes.push(classMap[`pm-flex--gap-${gap}`])

  return classes.filter(Boolean).join(" ")
}
