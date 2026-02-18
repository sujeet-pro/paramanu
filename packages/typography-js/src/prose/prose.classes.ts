import type { ProseClassesOptions } from "./prose.types.js"

const BASE = "pm-prose"

export function proseClasses(options: ProseClassesOptions = {}): string {
  const { size = "md" } = options
  const classes = [BASE, `${BASE}--${size}`]

  return classes.join(" ")
}

export function proseModuleClasses(
  classMap: Record<string, string>,
  options: ProseClassesOptions = {},
): string {
  const { size = "md" } = options
  const classes = [classMap["pm-prose"], classMap[`pm-prose--${size}`]]

  return classes.filter(Boolean).join(" ")
}
