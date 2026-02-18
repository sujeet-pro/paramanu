import type { GridClassesOptions } from "./grid.types.js"

const BASE = "pm-grid"

/**
 * Returns BEM class names for the grid component (human-readable).
 * Used by CDN and template consumers.
 */
export function gridClasses(options: GridClassesOptions = {}): string {
  const { columns, rows, gap, rowGap, columnGap, align, justify, inline } = options
  const classes = [BASE]

  if (inline) classes.push(`${BASE}--inline`)
  if (columns !== undefined) classes.push(`${BASE}--cols-${columns}`)
  if (rows !== undefined) classes.push(`${BASE}--rows-${rows}`)
  if (gap !== undefined) classes.push(`${BASE}--gap-${gap}`)
  if (rowGap !== undefined) classes.push(`${BASE}--row-gap-${rowGap}`)
  if (columnGap !== undefined) classes.push(`${BASE}--col-gap-${columnGap}`)
  if (align) classes.push(`${BASE}--align-${align}`)
  if (justify) classes.push(`${BASE}--justify-${justify}`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the grid component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function gridModuleClasses(
  classMap: Record<string, string>,
  options: GridClassesOptions = {},
): string {
  const { columns, rows, gap, rowGap, columnGap, align, justify, inline } = options
  const classes = [classMap["pm-grid"]]

  if (inline) classes.push(classMap["pm-grid--inline"])
  if (columns !== undefined) classes.push(classMap[`pm-grid--cols-${columns}`])
  if (rows !== undefined) classes.push(classMap[`pm-grid--rows-${rows}`])
  if (gap !== undefined) classes.push(classMap[`pm-grid--gap-${gap}`])
  if (rowGap !== undefined) classes.push(classMap[`pm-grid--row-gap-${rowGap}`])
  if (columnGap !== undefined) classes.push(classMap[`pm-grid--col-gap-${columnGap}`])
  if (align) classes.push(classMap[`pm-grid--align-${align}`])
  if (justify) classes.push(classMap[`pm-grid--justify-${justify}`])

  return classes.filter(Boolean).join(" ")
}
