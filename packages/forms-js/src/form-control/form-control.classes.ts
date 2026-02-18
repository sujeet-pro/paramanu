import type { FormControlClassesOptions } from "./form-control.types.js"

const BASE = "pm-form-control"

/**
 * Returns BEM class names for the form control component (human-readable).
 */
export function formControlClasses(options: FormControlClassesOptions = {}): string {
  const { orientation = "vertical", invalid = false, disabled = false, required = false } = options
  const classes = [BASE, `${BASE}--${orientation}`]

  if (invalid) classes.push(`${BASE}--invalid`)
  if (disabled) classes.push(`${BASE}--disabled`)
  if (required) classes.push(`${BASE}--required`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the form control component (hashed).
 */
export function formControlModuleClasses(
  classMap: Record<string, string>,
  options: FormControlClassesOptions = {},
): string {
  const { orientation = "vertical", invalid = false, disabled = false, required = false } = options

  const classes = [classMap["pm-form-control"], classMap[`pm-form-control--${orientation}`]]

  if (invalid) classes.push(classMap["pm-form-control--invalid"])
  if (disabled) classes.push(classMap["pm-form-control--disabled"])
  if (required) classes.push(classMap["pm-form-control--required"])

  return classes.filter(Boolean).join(" ")
}
