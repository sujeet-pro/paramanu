import type { ColorPickerClassesOptions } from "./color-picker.types.js"

const BASE = "pm-color-picker"

/**
 * Returns BEM class names for the color picker component (human-readable).
 */
export function colorPickerClasses(options: ColorPickerClassesOptions = {}): string {
  const { size = "md", disabled = false, open = false } = options
  const classes = [BASE, `${BASE}--${size}`]

  if (disabled) classes.push(`${BASE}--disabled`)
  if (open) classes.push(`${BASE}--open`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the color picker component (hashed).
 */
export function colorPickerModuleClasses(
  classMap: Record<string, string>,
  options: ColorPickerClassesOptions = {},
): string {
  const { size = "md", disabled = false, open = false } = options

  const classes = [classMap["pm-color-picker"], classMap[`pm-color-picker--${size}`]]

  if (disabled) classes.push(classMap["pm-color-picker--disabled"])
  if (open) classes.push(classMap["pm-color-picker--open"])

  return classes.filter(Boolean).join(" ")
}
