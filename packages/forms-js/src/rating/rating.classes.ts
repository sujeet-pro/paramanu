import type { RatingClassesOptions } from "./rating.types.js"

const BASE = "pm-rating"

/**
 * Returns BEM class names for the rating component (human-readable).
 */
export function ratingClasses(options: RatingClassesOptions = {}): string {
  const { size = "md", disabled = false, readOnly = false } = options
  const classes = [BASE, `${BASE}--${size}`]

  if (disabled) classes.push(`${BASE}--disabled`)
  if (readOnly) classes.push(`${BASE}--read-only`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the rating component (hashed).
 */
export function ratingModuleClasses(
  classMap: Record<string, string>,
  options: RatingClassesOptions = {},
): string {
  const { size = "md", disabled = false, readOnly = false } = options

  const classes = [classMap["pm-rating"], classMap[`pm-rating--${size}`]]

  if (disabled) classes.push(classMap["pm-rating--disabled"])
  if (readOnly) classes.push(classMap["pm-rating--read-only"])

  return classes.filter(Boolean).join(" ")
}
