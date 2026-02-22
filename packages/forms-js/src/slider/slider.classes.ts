import type { SliderClassesOptions } from "./slider.types.js"

const BASE = "pm-slider"

/**
 * Returns BEM class names for the slider component (human-readable).
 */
export function sliderClasses(options: SliderClassesOptions = {}): string {
  const { size = "md", disabled = false, orientation = "horizontal", showMarks = false } = options
  const classes = [BASE, `${BASE}--${size}`, `${BASE}--${orientation}`]

  if (disabled) classes.push(`${BASE}--disabled`)
  if (showMarks) classes.push(`${BASE}--show-marks`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the slider component (hashed).
 */
export function sliderModuleClasses(
  classMap: Record<string, string>,
  options: SliderClassesOptions = {},
): string {
  const { size = "md", disabled = false, orientation = "horizontal", showMarks = false } = options

  const classes = [
    classMap["pm-slider"],
    classMap[`pm-slider--${size}`],
    classMap[`pm-slider--${orientation}`],
  ]

  if (disabled) classes.push(classMap["pm-slider--disabled"])
  if (showMarks) classes.push(classMap["pm-slider--show-marks"])

  return classes.filter(Boolean).join(" ")
}
