import type { PinInputClassesOptions } from "./pin-input.types.js"

const BASE = "pm-pin-input"

/**
 * Returns BEM class names for the pin input component (human-readable).
 */
export function pinInputClasses(options: PinInputClassesOptions = {}): string {
  const { size = "md", disabled = false, invalid = false } = options
  const classes = [BASE, `${BASE}--${size}`]

  if (disabled) classes.push(`${BASE}--disabled`)
  if (invalid) classes.push(`${BASE}--invalid`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the pin input component (hashed).
 */
export function pinInputModuleClasses(
  classMap: Record<string, string>,
  options: PinInputClassesOptions = {},
): string {
  const { size = "md", disabled = false, invalid = false } = options

  const classes = [classMap["pm-pin-input"], classMap[`pm-pin-input--${size}`]]

  if (disabled) classes.push(classMap["pm-pin-input--disabled"])
  if (invalid) classes.push(classMap["pm-pin-input--invalid"])

  return classes.filter(Boolean).join(" ")
}
