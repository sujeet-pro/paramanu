import type { PwdInputClassesOptions } from "./password-input.types.js"

const BASE = "pm-pwd-input"

/**
 * Returns BEM class names for the password input wrapper (human-readable).
 */
export function pwdInputClasses(options: PwdInputClassesOptions = {}): string {
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
export function pwdInputModuleClasses(
  classMap: Record<string, string>,
  options: PwdInputClassesOptions = {},
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
    classMap["pm-pwd-input"],
    classMap[`pm-pwd-input--${variant}`],
    classMap[`pm-pwd-input--${size}`],
  ]

  if (invalid) classes.push(classMap["pm-pwd-input--invalid"])
  if (disabled) classes.push(classMap["pm-pwd-input--disabled"])
  if (fullWidth) classes.push(classMap["pm-pwd-input--full-width"])
  if (visible) classes.push(classMap["pm-pwd-input--visible"])

  return classes.filter(Boolean).join(" ")
}
