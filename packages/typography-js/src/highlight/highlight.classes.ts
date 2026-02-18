import type { HighlightClassesOptions } from "./highlight.types.js"

const BASE = "pm-highlight"

export function highlightClasses(options: HighlightClassesOptions = {}): string {
  const { color = "primary", variant = "filled" } = options
  const classes = [BASE, `${BASE}--${color}`]

  if (variant !== "filled") classes.push(`${BASE}--${variant}`)

  return classes.join(" ")
}

export function highlightModuleClasses(
  classMap: Record<string, string>,
  options: HighlightClassesOptions = {},
): string {
  const { color = "primary", variant = "filled" } = options
  const classes = [classMap["pm-highlight"], classMap[`pm-highlight--${color}`]]

  if (variant !== "filled") classes.push(classMap[`pm-highlight--${variant}`])

  return classes.filter(Boolean).join(" ")
}
