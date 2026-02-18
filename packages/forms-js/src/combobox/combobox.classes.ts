import type { ComboboxClassesOptions } from "./combobox.types.js"

const BASE = "pm-combobox"

/**
 * Returns BEM class names for the combobox component (human-readable).
 */
export function comboboxClasses(options: ComboboxClassesOptions = {}): string {
  const {
    variant = "outline",
    size = "md",
    invalid = false,
    disabled = false,
    open = false,
    fullWidth = false,
  } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`]

  if (invalid) classes.push(`${BASE}--invalid`)
  if (disabled) classes.push(`${BASE}--disabled`)
  if (open) classes.push(`${BASE}--open`)
  if (fullWidth) classes.push(`${BASE}--full-width`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the combobox component (hashed).
 */
export function comboboxModuleClasses(
  classMap: Record<string, string>,
  options: ComboboxClassesOptions = {},
): string {
  const {
    variant = "outline",
    size = "md",
    invalid = false,
    disabled = false,
    open = false,
    fullWidth = false,
  } = options

  const classes = [
    classMap["pm-combobox"],
    classMap[`pm-combobox--${variant}`],
    classMap[`pm-combobox--${size}`],
  ]

  if (invalid) classes.push(classMap["pm-combobox--invalid"])
  if (disabled) classes.push(classMap["pm-combobox--disabled"])
  if (open) classes.push(classMap["pm-combobox--open"])
  if (fullWidth) classes.push(classMap["pm-combobox--full-width"])

  return classes.filter(Boolean).join(" ")
}
