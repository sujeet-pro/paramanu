import type { ChkCardClassesOptions } from "./checkbox-card.types.js"

const BASE = "pm-chk-card"

/**
 * Returns BEM class names for the checkbox card component (human-readable).
 */
export function chkCardClasses(options: ChkCardClassesOptions = {}): string {
  const { size = "md", disabled = false, checked = false } = options
  const classes = [BASE, `${BASE}--${size}`]

  if (disabled) classes.push(`${BASE}--disabled`)
  if (checked) classes.push(`${BASE}--checked`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the checkbox card component (hashed).
 */
export function chkCardModuleClasses(
  classMap: Record<string, string>,
  options: ChkCardClassesOptions = {},
): string {
  const { size = "md", disabled = false, checked = false } = options

  const classes = [classMap["pm-chk-card"], classMap[`pm-chk-card--${size}`]]

  if (disabled) classes.push(classMap["pm-chk-card--disabled"])
  if (checked) classes.push(classMap["pm-chk-card--checked"])

  return classes.filter(Boolean).join(" ")
}
