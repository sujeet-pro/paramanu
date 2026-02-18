import type { MarkClassesOptions } from "./mark.types.js"

const BASE = "pm-mark"

export function markClasses(options: MarkClassesOptions = {}): string {
  const { variant = "default" } = options
  const classes = [BASE, `${BASE}--${variant}`]

  return classes.join(" ")
}

export function markModuleClasses(
  classMap: Record<string, string>,
  options: MarkClassesOptions = {},
): string {
  const { variant = "default" } = options
  const classes = [classMap["pm-mark"], classMap[`pm-mark--${variant}`]]

  return classes.filter(Boolean).join(" ")
}
