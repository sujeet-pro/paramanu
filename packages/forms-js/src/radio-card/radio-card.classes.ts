import type { RadioCardClassesOptions } from "./radio-card.types.js"

const BASE = "pm-radio-card"

/**
 * Returns BEM class names for the radio card component (human-readable).
 */
export function radioCardClasses(options: RadioCardClassesOptions = {}): string {
  const { size = "md", disabled = false, checked = false } = options
  const classes = [BASE, `${BASE}--${size}`]

  if (disabled) classes.push(`${BASE}--disabled`)
  if (checked) classes.push(`${BASE}--checked`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the radio card component (hashed).
 */
export function radioCardModuleClasses(
  classMap: Record<string, string>,
  options: RadioCardClassesOptions = {},
): string {
  const { size = "md", disabled = false, checked = false } = options

  const classes = [classMap["pm-radio-card"], classMap[`pm-radio-card--${size}`]]

  if (disabled) classes.push(classMap["pm-radio-card--disabled"])
  if (checked) classes.push(classMap["pm-radio-card--checked"])

  return classes.filter(Boolean).join(" ")
}
