import type { DatePickerClassesOptions } from "./date-picker.types.js"

const BASE = "pm-date-picker"

/**
 * Returns BEM class names for the date picker component (human-readable).
 */
export function datePickerClasses(options: DatePickerClassesOptions = {}): string {
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
 * Returns CSS module class names for the date picker component (hashed).
 */
export function datePickerModuleClasses(
  classMap: Record<string, string>,
  options: DatePickerClassesOptions = {},
): string {
  const {
    variant = "outline",
    size = "md",
    invalid = false,
    disabled = false,
    open = false,
  } = options

  const classes = [
    classMap["pm-date-picker"],
    classMap[`pm-date-picker--${variant}`],
    classMap[`pm-date-picker--${size}`],
  ]

  if (invalid) classes.push(classMap["pm-date-picker--invalid"])
  if (disabled) classes.push(classMap["pm-date-picker--disabled"])
  if (open) classes.push(classMap["pm-date-picker--open"])

  return classes.filter(Boolean).join(" ")
}
