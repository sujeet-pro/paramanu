import type { NativeSelClassesOptions } from "./native-select.types.js"

const BASE = "pm-native-sel"

/**
 * Returns BEM class names for the native select component (human-readable).
 */
export function nativeSelClasses(options: NativeSelClassesOptions = {}): string {
  const { variant = "outline", size = "md", invalid = false, disabled = false, fullWidth = false } =
    options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`]

  if (invalid) classes.push(`${BASE}--invalid`)
  if (disabled) classes.push(`${BASE}--disabled`)
  if (fullWidth) classes.push(`${BASE}--full-width`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the native select component (hashed).
 */
export function nativeSelModuleClasses(
  classMap: Record<string, string>,
  options: NativeSelClassesOptions = {},
): string {
  const { variant = "outline", size = "md", invalid = false, disabled = false, fullWidth = false } =
    options

  const classes = [
    classMap["pm-native-sel"],
    classMap[`pm-native-sel--${variant}`],
    classMap[`pm-native-sel--${size}`],
  ]

  if (invalid) classes.push(classMap["pm-native-sel--invalid"])
  if (disabled) classes.push(classMap["pm-native-sel--disabled"])
  if (fullWidth) classes.push(classMap["pm-native-sel--full-width"])

  return classes.filter(Boolean).join(" ")
}
