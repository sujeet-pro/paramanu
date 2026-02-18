import type { TruncateClassesOptions } from "./truncate.types.js"

const BASE = "pm-truncate"

export function truncateClasses(options: TruncateClassesOptions = {}): string {
  const { lines = 1, position = "end" } = options
  const classes = [BASE, `${BASE}--lines-${lines}`]

  if (position !== "end") classes.push(`${BASE}--${position}`)

  return classes.join(" ")
}

export function truncateModuleClasses(
  classMap: Record<string, string>,
  options: TruncateClassesOptions = {},
): string {
  const { lines = 1, position = "end" } = options
  const classes = [classMap["pm-truncate"], classMap[`pm-truncate--lines-${lines}`]]

  if (position !== "end") classes.push(classMap[`pm-truncate--${position}`])

  return classes.filter(Boolean).join(" ")
}
