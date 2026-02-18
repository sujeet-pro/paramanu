import type { PasswordInputClassesOptions } from "./password-input.types.js"

const BASE = "pm-password-input"

/**
 * Returns BEM class names for the password input wrapper (human-readable).
 */
export function passwordInputClasses(options: PasswordInputClassesOptions = {}): string {
  const {
    variant = "outline",
    size = "md",
    invalid = false,
    disabled = false,
    fullWidth = false,
    visible = false,
  } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`]

  if (invalid) classes.push(`${BASE}--invalid`)
  if (disabled) classes.push(`${BASE}--disabled`)
  if (fullWidth) classes.push(`${BASE}--full-width`)
  if (visible) classes.push(`${BASE}--visible`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the password input wrapper (hashed).
 */
export function passwordInputModuleClasses(
  classMap: Record<string, string>,
  options: PasswordInputClassesOptions = {},
): string {
  const {
    variant = "outline",
    size = "md",
    invalid = false,
    disabled = false,
    fullWidth = false,
    visible = false,
  } = options

  const classes = [
    classMap["pm-password-input"],
    classMap[`pm-password-input--${variant}`],
    classMap[`pm-password-input--${size}`],
  ]

  if (invalid) classes.push(classMap["pm-password-input--invalid"])
  if (disabled) classes.push(classMap["pm-password-input--disabled"])
  if (fullWidth) classes.push(classMap["pm-password-input--full-width"])
  if (visible) classes.push(classMap["pm-password-input--visible"])

  return classes.filter(Boolean).join(" ")
}
