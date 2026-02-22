import type { InputClassesOptions } from "./input.types.js"

const BASE = "pm-input"

/**
 * Returns BEM class names for the input component (human-readable).
 */
export function inputClasses(options: InputClassesOptions = {}): string {
  const {
    variant = "outline",
    size = "md",
    invalid = false,
    disabled = false,
    readOnly = false,
    fullWidth = false,
  } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`]

  if (invalid) classes.push(`${BASE}--invalid`)
  if (disabled) classes.push(`${BASE}--disabled`)
  if (readOnly) classes.push(`${BASE}--read-only`)
  if (fullWidth) classes.push(`${BASE}--full-width`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the input component (hashed).
 */
export function inputModuleClasses(
  classMap: Record<string, string>,
  options: InputClassesOptions = {},
): string {
  const {
    variant = "outline",
    size = "md",
    invalid = false,
    disabled = false,
    readOnly = false,
    fullWidth = false,
  } = options

  const classes = [
    classMap["pm-input"],
    classMap[`pm-input--${variant}`],
    classMap[`pm-input--${size}`],
  ]

  if (invalid) classes.push(classMap["pm-input--invalid"])
  if (disabled) classes.push(classMap["pm-input--disabled"])
  if (readOnly) classes.push(classMap["pm-input--read-only"])
  if (fullWidth) classes.push(classMap["pm-input--full-width"])

  return classes.filter(Boolean).join(" ")
}
