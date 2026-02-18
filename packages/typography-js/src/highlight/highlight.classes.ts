import type { HighlightClassesOptions } from "./highlight.types.js"

const BASE = "pm-highlight"

export function highlightClasses(options: HighlightClassesOptions = {}): string {
  const { color = "primary" } = options
  const classes = [BASE, `${BASE}--${color}`]

  return classes.join(" ")
}

export function highlightModuleClasses(
  classMap: Record<string, string>,
  options: HighlightClassesOptions = {},
): string {
  const { color = "primary" } = options
  const classes = [classMap["pm-highlight"], classMap[`pm-highlight--${color}`]]

  return classes.filter(Boolean).join(" ")
}
