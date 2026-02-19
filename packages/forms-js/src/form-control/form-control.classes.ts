import type { FormCtrlClassesOptions } from "./form-control.types.js"

const BASE = "pm-form-ctrl"

/**
 * Returns BEM class names for the form control component (human-readable).
 */
export function formCtrlClasses(options: FormCtrlClassesOptions = {}): string {
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
export function formCtrlModuleClasses(
  classMap: Record<string, string>,
  options: FormCtrlClassesOptions = {},
): string {
  const { orientation = "vertical", invalid = false, disabled = false, required = false } = options

  const classes = [classMap["pm-form-ctrl"], classMap[`pm-form-ctrl--${orientation}`]]

  if (invalid) classes.push(classMap["pm-form-ctrl--invalid"])
  if (disabled) classes.push(classMap["pm-form-ctrl--disabled"])
  if (required) classes.push(classMap["pm-form-ctrl--required"])

  return classes.filter(Boolean).join(" ")
}
