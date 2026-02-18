import type { TimePickerClassesOptions } from "./time-picker.types.js"

const BASE = "pm-time-picker"

/**
 * Returns BEM class names for the time picker component (human-readable).
 */
export function timePickerClasses(options: TimePickerClassesOptions = {}): string {
  const {
    variant = "outline",
    size = "md",
    invalid = false,
    disabled = false,
    open = false,
  } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`]

  if (invalid) classes.push(`${BASE}--invalid`)
  if (disabled) classes.push(`${BASE}--disabled`)
  if (open) classes.push(`${BASE}--open`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the time picker component (hashed).
 */
export function timePickerModuleClasses(
  classMap: Record<string, string>,
  options: TimePickerClassesOptions = {},
): string {
  const {
    variant = "outline",
    size = "md",
    invalid = false,
    disabled = false,
    open = false,
  } = options

  const classes = [
    classMap["pm-time-picker"],
    classMap[`pm-time-picker--${variant}`],
    classMap[`pm-time-picker--${size}`],
  ]

  if (invalid) classes.push(classMap["pm-time-picker--invalid"])
  if (disabled) classes.push(classMap["pm-time-picker--disabled"])
  if (open) classes.push(classMap["pm-time-picker--open"])

  return classes.filter(Boolean).join(" ")
}
