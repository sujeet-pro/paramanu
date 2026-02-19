import type { ColorpickerClassesOptions } from "./color-picker.types.js"

const BASE = "pm-colorpicker"

/**
 * Returns BEM class names for the color picker component (human-readable).
 */
export function colorpickerClasses(options: ColorpickerClassesOptions = {}): string {
  const { size = "md", disabled = false, open = false } = options
  const classes = [BASE, `${BASE}--${size}`]

  if (disabled) classes.push(`${BASE}--disabled`)
  if (open) classes.push(`${BASE}--open`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the color picker component (hashed).
 */
export function colorpickerModuleClasses(
  classMap: Record<string, string>,
  options: ColorpickerClassesOptions = {},
): string {
  const { size = "md", disabled = false, open = false } = options

  const classes = [classMap["pm-colorpicker"], classMap[`pm-colorpicker--${size}`]]

  if (disabled) classes.push(classMap["pm-colorpicker--disabled"])
  if (open) classes.push(classMap["pm-colorpicker--open"])

  return classes.filter(Boolean).join(" ")
}
