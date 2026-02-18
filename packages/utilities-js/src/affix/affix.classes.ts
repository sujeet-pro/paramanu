import type { AffixClassesOptions } from "./affix.types.js"

const BASE = "pm-affix"

export function affixClasses(options: AffixClassesOptions = {}): string {
  const { position = "top", offset } = options
  const classes = [BASE, `${BASE}--${position}`]
  if (offset !== undefined) classes.push(`${BASE}--offset-${offset}`)
  return classes.join(" ")
}

export function affixModuleClasses(
  classMap: Record<string, string>,
  options: AffixClassesOptions = {},
): string {
  const { position = "top", offset } = options
  const classes = [classMap["pm-affix"], classMap[`pm-affix--${position}`]]
  if (offset !== undefined) classes.push(classMap[`pm-affix--offset-${offset}`])
  return classes.filter(Boolean).join(" ")
}
