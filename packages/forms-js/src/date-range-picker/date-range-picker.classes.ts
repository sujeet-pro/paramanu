import type { DateRangePickerClassesOptions } from "./date-range-picker.types.js"

const BASE = "pm-date-range-picker"

/**
 * Returns BEM class names for the date range picker component (human-readable).
 */
export function dateRangePickerClasses(options: DateRangePickerClassesOptions = {}): string {
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
 * Returns CSS module class names for the date range picker component (hashed).
 */
export function dateRangePickerModuleClasses(
  classMap: Record<string, string>,
  options: DateRangePickerClassesOptions = {},
): string {
  const {
    variant = "outline",
    size = "md",
    invalid = false,
    disabled = false,
    open = false,
  } = options

  const classes = [
    classMap["pm-date-range-picker"],
    classMap[`pm-date-range-picker--${variant}`],
    classMap[`pm-date-range-picker--${size}`],
  ]

  if (invalid) classes.push(classMap["pm-date-range-picker--invalid"])
  if (disabled) classes.push(classMap["pm-date-range-picker--disabled"])
  if (open) classes.push(classMap["pm-date-range-picker--open"])

  return classes.filter(Boolean).join(" ")
}
