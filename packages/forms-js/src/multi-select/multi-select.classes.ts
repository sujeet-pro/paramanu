import type { MultiSelectClassesOptions } from "./multi-select.types.js"

const BASE = "pm-multi-select"

/**
 * Returns BEM class names for the multi-select component (human-readable).
 */
export function multiSelectClasses(options: MultiSelectClassesOptions = {}): string {
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
 * Returns CSS module class names for the multi-select component (hashed).
 */
export function multiSelectModuleClasses(
  classMap: Record<string, string>,
  options: MultiSelectClassesOptions = {},
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
    classMap["pm-multi-select"],
    classMap[`pm-multi-select--${variant}`],
    classMap[`pm-multi-select--${size}`],
  ]

  if (invalid) classes.push(classMap["pm-multi-select--invalid"])
  if (disabled) classes.push(classMap["pm-multi-select--disabled"])
  if (open) classes.push(classMap["pm-multi-select--open"])
  if (fullWidth) classes.push(classMap["pm-multi-select--full-width"])

  return classes.filter(Boolean).join(" ")
}
