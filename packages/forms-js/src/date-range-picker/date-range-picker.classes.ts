import type { DaterangeClassesOptions } from "./date-range-picker.types.js"

const BASE = "pm-daterange"

/**
 * Returns BEM class names for the date range picker component (human-readable).
 */
export function daterangeClasses(options: DaterangeClassesOptions = {}): string {
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
export function daterangeModuleClasses(
  classMap: Record<string, string>,
  options: DaterangeClassesOptions = {},
): string {
  const {
    variant = "outline",
    size = "md",
    invalid = false,
    disabled = false,
    open = false,
  } = options

  const classes = [
    classMap["pm-daterange"],
    classMap[`pm-daterange--${variant}`],
    classMap[`pm-daterange--${size}`],
  ]

  if (invalid) classes.push(classMap["pm-daterange--invalid"])
  if (disabled) classes.push(classMap["pm-daterange--disabled"])
  if (open) classes.push(classMap["pm-daterange--open"])

  return classes.filter(Boolean).join(" ")
}
