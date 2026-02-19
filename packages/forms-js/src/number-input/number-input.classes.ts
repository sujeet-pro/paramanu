import type { NumInputClassesOptions } from "./number-input.types.js"

const BASE = "pm-num-input"

/**
 * Returns BEM class names for the number input wrapper (human-readable).
 */
export function numInputClasses(options: NumInputClassesOptions = {}): string {
  const { variant = "outline", size = "md", invalid = false, disabled = false } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`]

  if (invalid) classes.push(`${BASE}--invalid`)
  if (disabled) classes.push(`${BASE}--disabled`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the number input wrapper (hashed).
 */
export function numInputModuleClasses(
  classMap: Record<string, string>,
  options: NumInputClassesOptions = {},
): string {
  const { variant = "outline", size = "md", invalid = false, disabled = false } = options

  const classes = [
    classMap["pm-num-input"],
    classMap[`pm-num-input--${variant}`],
    classMap[`pm-num-input--${size}`],
  ]

  if (invalid) classes.push(classMap["pm-num-input--invalid"])
  if (disabled) classes.push(classMap["pm-num-input--disabled"])

  return classes.filter(Boolean).join(" ")
}
