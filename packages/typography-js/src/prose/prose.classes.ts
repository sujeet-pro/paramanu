import type { ProseClassesOptions } from "./prose.types.js"

const BASE = "pm-prose"

export function proseClasses(options: ProseClassesOptions = {}): string {
  const { size = "md", color, trimMargins = false } = options
  const classes = [BASE, `${BASE}--${size}`]

  if (color) classes.push(`${BASE}--color-${color}`)
  if (trimMargins) classes.push(`${BASE}--trim`)

  return classes.join(" ")
}

export function proseModuleClasses(
  classMap: Record<string, string>,
  options: ProseClassesOptions = {},
): string {
  const { size = "md", color, trimMargins = false } = options
  const classes = [classMap["pm-prose"], classMap[`pm-prose--${size}`]]

  if (color) classes.push(classMap[`pm-prose--color-${color}`])
  if (trimMargins) classes.push(classMap["pm-prose--trim"])

  return classes.filter(Boolean).join(" ")
}
