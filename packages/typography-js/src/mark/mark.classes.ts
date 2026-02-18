import type { MarkClassesOptions } from "./mark.types.js"

const BASE = "pm-mark"

export function markClasses(options: MarkClassesOptions = {}): string {
  const { variant = "default", color } = options
  const classes = [BASE, `${BASE}--${variant}`]

  if (color) classes.push(`${BASE}--color-${color}`)

  return classes.join(" ")
}

export function markModuleClasses(
  classMap: Record<string, string>,
  options: MarkClassesOptions = {},
): string {
  const { variant = "default", color } = options
  const classes = [classMap["pm-mark"], classMap[`pm-mark--${variant}`]]

  if (color) classes.push(classMap[`pm-mark--color-${color}`])

  return classes.filter(Boolean).join(" ")
}
