import type { NativeSelectClassesOptions } from "./native-select.types.js"

const BASE = "pm-native-select"

/**
 * Returns BEM class names for the native select component (human-readable).
 */
export function nativeSelectClasses(options: NativeSelectClassesOptions = {}): string {
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
export function nativeSelectModuleClasses(
  classMap: Record<string, string>,
  options: NativeSelectClassesOptions = {},
): string {
  const { variant = "outline", size = "md", invalid = false, disabled = false, fullWidth = false } =
    options

  const classes = [
    classMap["pm-native-select"],
    classMap[`pm-native-select--${variant}`],
    classMap[`pm-native-select--${size}`],
  ]

  if (invalid) classes.push(classMap["pm-native-select--invalid"])
  if (disabled) classes.push(classMap["pm-native-select--disabled"])
  if (fullWidth) classes.push(classMap["pm-native-select--full-width"])

  return classes.filter(Boolean).join(" ")
}
