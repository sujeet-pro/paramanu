import type { MultiSelClassesOptions } from "./multi-select.types.js"

const BASE = "pm-multi-sel"

/**
 * Returns BEM class names for the multi-select component (human-readable).
 */
export function multiSelClasses(options: MultiSelClassesOptions = {}): string {
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
export function multiSelModuleClasses(
  classMap: Record<string, string>,
  options: MultiSelClassesOptions = {},
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
    classMap["pm-multi-sel"],
    classMap[`pm-multi-sel--${variant}`],
    classMap[`pm-multi-sel--${size}`],
  ]

  if (invalid) classes.push(classMap["pm-multi-sel--invalid"])
  if (disabled) classes.push(classMap["pm-multi-sel--disabled"])
  if (open) classes.push(classMap["pm-multi-sel--open"])
  if (fullWidth) classes.push(classMap["pm-multi-sel--full-width"])

  return classes.filter(Boolean).join(" ")
}
