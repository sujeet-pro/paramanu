import type { SimpleGridClassesOptions } from "./simple-grid.types.js"

const BASE = "pm-simple-grid"

/**
 * Returns BEM class names for the simple-grid component (human-readable).
 * Used by CDN and template consumers.
 * Note: minChildWidth takes priority over columns when both are specified.
 */
export function simpleGridClasses(options: SimpleGridClassesOptions = {}): string {
  const { minChildWidth, columns, gap } = options
  const classes = [BASE]

  if (minChildWidth) {
    classes.push(`${BASE}--min-${minChildWidth}`)
  } else if (columns !== undefined) {
    classes.push(`${BASE}--cols-${columns}`)
  }

  if (gap !== undefined) classes.push(`${BASE}--gap-${gap}`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the simple-grid component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 * Note: minChildWidth takes priority over columns when both are specified.
 */
export function simpleGridModuleClasses(
  classMap: Record<string, string>,
  options: SimpleGridClassesOptions = {},
): string {
  const { minChildWidth, columns, gap } = options
  const classes = [classMap["pm-simple-grid"]]

  if (minChildWidth) {
    classes.push(classMap[`pm-simple-grid--min-${minChildWidth}`])
  } else if (columns !== undefined) {
    classes.push(classMap[`pm-simple-grid--cols-${columns}`])
  }

  if (gap !== undefined) classes.push(classMap[`pm-simple-grid--gap-${gap}`])

  return classes.filter(Boolean).join(" ")
}
