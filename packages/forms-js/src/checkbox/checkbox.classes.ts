import type { CheckboxClassesOptions } from "./checkbox.types.js"

const BASE = "pm-checkbox"

/**
 * Returns BEM class names for the checkbox component (human-readable).
 */
export function checkboxClasses(options: CheckboxClassesOptions = {}): string {
  const {
    size = "md",
    disabled = false,
    invalid = false,
    checked = false,
    indeterminate = false,
  } = options
  const classes = [BASE, `${BASE}--${size}`]

  if (disabled) classes.push(`${BASE}--disabled`)
  if (invalid) classes.push(`${BASE}--invalid`)
  if (checked) classes.push(`${BASE}--checked`)
  if (indeterminate) classes.push(`${BASE}--indeterminate`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the checkbox component (hashed).
 */
export function checkboxModuleClasses(
  classMap: Record<string, string>,
  options: CheckboxClassesOptions = {},
): string {
  const {
    size = "md",
    disabled = false,
    invalid = false,
    checked = false,
    indeterminate = false,
  } = options

  const classes = [classMap["pm-checkbox"], classMap[`pm-checkbox--${size}`]]

  if (disabled) classes.push(classMap["pm-checkbox--disabled"])
  if (invalid) classes.push(classMap["pm-checkbox--invalid"])
  if (checked) classes.push(classMap["pm-checkbox--checked"])
  if (indeterminate) classes.push(classMap["pm-checkbox--indeterminate"])

  return classes.filter(Boolean).join(" ")
}
