import type { CheckboxCardClassesOptions } from "./checkbox-card.types.js"

const BASE = "pm-checkbox-card"

/**
 * Returns BEM class names for the checkbox card component (human-readable).
 */
export function checkboxCardClasses(options: CheckboxCardClassesOptions = {}): string {
  const { size = "md", disabled = false, checked = false } = options
  const classes = [BASE, `${BASE}--${size}`]

  if (disabled) classes.push(`${BASE}--disabled`)
  if (checked) classes.push(`${BASE}--checked`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the checkbox card component (hashed).
 */
export function checkboxCardModuleClasses(
  classMap: Record<string, string>,
  options: CheckboxCardClassesOptions = {},
): string {
  const { size = "md", disabled = false, checked = false } = options

  const classes = [classMap["pm-checkbox-card"], classMap[`pm-checkbox-card--${size}`]]

  if (disabled) classes.push(classMap["pm-checkbox-card--disabled"])
  if (checked) classes.push(classMap["pm-checkbox-card--checked"])

  return classes.filter(Boolean).join(" ")
}
