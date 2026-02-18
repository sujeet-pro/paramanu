import type { NumberInputClassesOptions } from "./number-input.types.js"

const BASE = "pm-number-input"

/**
 * Returns BEM class names for the number input wrapper (human-readable).
 */
export function numberInputClasses(options: NumberInputClassesOptions = {}): string {
  const { variant = "outline", size = "md", invalid = false, disabled = false } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`]

  if (invalid) classes.push(`${BASE}--invalid`)
  if (disabled) classes.push(`${BASE}--disabled`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the number input wrapper (hashed).
 */
export function numberInputModuleClasses(
  classMap: Record<string, string>,
  options: NumberInputClassesOptions = {},
): string {
  const { variant = "outline", size = "md", invalid = false, disabled = false } = options

  const classes = [
    classMap["pm-number-input"],
    classMap[`pm-number-input--${variant}`],
    classMap[`pm-number-input--${size}`],
  ]

  if (invalid) classes.push(classMap["pm-number-input--invalid"])
  if (disabled) classes.push(classMap["pm-number-input--disabled"])

  return classes.filter(Boolean).join(" ")
}
