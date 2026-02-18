import type { FieldsetClassesOptions } from "./fieldset.types.js"

const BASE = "pm-fieldset"

/**
 * Returns BEM class names for the fieldset component (human-readable).
 */
export function fieldsetClasses(options: FieldsetClassesOptions = {}): string {
  const { variant = "default", disabled = false } = options
  const classes = [BASE, `${BASE}--${variant}`]

  if (disabled) classes.push(`${BASE}--disabled`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the fieldset component (hashed).
 */
export function fieldsetModuleClasses(
  classMap: Record<string, string>,
  options: FieldsetClassesOptions = {},
): string {
  const { variant = "default", disabled = false } = options

  const classes = [classMap["pm-fieldset"], classMap[`pm-fieldset--${variant}`]]

  if (disabled) classes.push(classMap["pm-fieldset--disabled"])

  return classes.filter(Boolean).join(" ")
}
