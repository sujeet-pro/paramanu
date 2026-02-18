import type { LabelClassesOptions } from "./label.types.js"

const BASE = "pm-label"

/**
 * Returns BEM class names for the label component (human-readable).
 */
export function labelClasses(options: LabelClassesOptions = {}): string {
  const { size = "md", disabled = false, required = false } = options
  const classes = [BASE, `${BASE}--${size}`]

  if (disabled) classes.push(`${BASE}--disabled`)
  if (required) classes.push(`${BASE}--required`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the label component (hashed).
 */
export function labelModuleClasses(
  classMap: Record<string, string>,
  options: LabelClassesOptions = {},
): string {
  const { size = "md", disabled = false, required = false } = options

  const classes = [classMap["pm-label"], classMap[`pm-label--${size}`]]

  if (disabled) classes.push(classMap["pm-label--disabled"])
  if (required) classes.push(classMap["pm-label--required"])

  return classes.filter(Boolean).join(" ")
}
