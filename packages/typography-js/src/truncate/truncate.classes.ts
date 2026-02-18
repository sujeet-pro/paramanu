import type { TruncateClassesOptions } from "./truncate.types.js"

const BASE = "pm-truncate"

export function truncateClasses(options: TruncateClassesOptions = {}): string {
  const { lines = 1 } = options
  const classes = [BASE, `${BASE}--lines-${lines}`]

  return classes.join(" ")
}

export function truncateModuleClasses(
  classMap: Record<string, string>,
  options: TruncateClassesOptions = {},
): string {
  const { lines = 1 } = options
  const classes = [classMap["pm-truncate"], classMap[`pm-truncate--lines-${lines}`]]

  return classes.filter(Boolean).join(" ")
}
