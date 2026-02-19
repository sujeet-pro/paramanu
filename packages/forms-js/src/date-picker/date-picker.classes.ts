import type { DatepickerClassesOptions } from "./date-picker.types.js"

const BASE = "pm-datepicker"

/**
 * Returns BEM class names for the date picker component (human-readable).
 */
export function datepickerClasses(options: DatepickerClassesOptions = {}): string {
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
export function datepickerModuleClasses(
  classMap: Record<string, string>,
  options: DatepickerClassesOptions = {},
): string {
  const {
    variant = "outline",
    size = "md",
    invalid = false,
    disabled = false,
    open = false,
  } = options

  const classes = [
    classMap["pm-datepicker"],
    classMap[`pm-datepicker--${variant}`],
    classMap[`pm-datepicker--${size}`],
  ]

  if (invalid) classes.push(classMap["pm-datepicker--invalid"])
  if (disabled) classes.push(classMap["pm-datepicker--disabled"])
  if (open) classes.push(classMap["pm-datepicker--open"])

  return classes.filter(Boolean).join(" ")
}
