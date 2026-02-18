import type { SelectClassesOptions } from "./select.types.js"

const BASE = "pm-select"

/**
 * Returns BEM class names for the select component (human-readable).
 */
export function selectClasses(options: SelectClassesOptions = {}): string {
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
 * Returns CSS module class names for the select component (hashed).
 */
export function selectModuleClasses(
  classMap: Record<string, string>,
  options: SelectClassesOptions = {},
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
    classMap["pm-select"],
    classMap[`pm-select--${variant}`],
    classMap[`pm-select--${size}`],
  ]

  if (invalid) classes.push(classMap["pm-select--invalid"])
  if (disabled) classes.push(classMap["pm-select--disabled"])
  if (open) classes.push(classMap["pm-select--open"])
  if (fullWidth) classes.push(classMap["pm-select--full-width"])

  return classes.filter(Boolean).join(" ")
}
