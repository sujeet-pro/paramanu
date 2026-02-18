import type { MasonryClassesOptions } from "./masonry.types.js"

const BASE = "pm-masonry"

/**
 * Returns BEM class names for the masonry component (human-readable).
 * Used by CDN and template consumers.
 */
export function masonryClasses(options: MasonryClassesOptions = {}): string {
  const { columns = 3, gap } = options
  const classes = [BASE, `${BASE}--cols-${columns}`]

  if (gap !== undefined) classes.push(`${BASE}--gap-${gap}`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the masonry component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function masonryModuleClasses(
  classMap: Record<string, string>,
  options: MasonryClassesOptions = {},
): string {
  const { columns = 3, gap } = options

  const classes = [classMap["pm-masonry"], classMap[`pm-masonry--cols-${columns}`]]

  if (gap !== undefined) classes.push(classMap[`pm-masonry--gap-${gap}`])

  return classes.filter(Boolean).join(" ")
}
