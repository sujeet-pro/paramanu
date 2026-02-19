import type { TimepickerClassesOptions } from "./time-picker.types.js"

const BASE = "pm-timepicker"

/**
 * Returns BEM class names for the time picker component (human-readable).
 */
export function timepickerClasses(options: TimepickerClassesOptions = {}): string {
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
export function timepickerModuleClasses(
  classMap: Record<string, string>,
  options: TimepickerClassesOptions = {},
): string {
  const {
    variant = "outline",
    size = "md",
    invalid = false,
    disabled = false,
    open = false,
  } = options

  const classes = [
    classMap["pm-timepicker"],
    classMap[`pm-timepicker--${variant}`],
    classMap[`pm-timepicker--${size}`],
  ]

  if (invalid) classes.push(classMap["pm-timepicker--invalid"])
  if (disabled) classes.push(classMap["pm-timepicker--disabled"])
  if (open) classes.push(classMap["pm-timepicker--open"])

  return classes.filter(Boolean).join(" ")
}
