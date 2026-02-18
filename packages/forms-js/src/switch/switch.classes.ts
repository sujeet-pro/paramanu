import type { SwitchClassesOptions } from "./switch.types.js"

const BASE = "pm-switch"

/**
 * Returns BEM class names for the switch component (human-readable).
 */
export function switchClasses(options: SwitchClassesOptions = {}): string {
  const { size = "md", disabled = false, checked = false, labelPlacement = "end" } = options
  const classes = [BASE, `${BASE}--${size}`, `${BASE}--label-${labelPlacement}`]

  if (disabled) classes.push(`${BASE}--disabled`)
  if (checked) classes.push(`${BASE}--checked`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the switch component (hashed).
 */
export function switchModuleClasses(
  classMap: Record<string, string>,
  options: SwitchClassesOptions = {},
): string {
  const { size = "md", disabled = false, checked = false, labelPlacement = "end" } = options

  const classes = [
    classMap["pm-switch"],
    classMap[`pm-switch--${size}`],
    classMap[`pm-switch--label-${labelPlacement}`],
  ]

  if (disabled) classes.push(classMap["pm-switch--disabled"])
  if (checked) classes.push(classMap["pm-switch--checked"])

  return classes.filter(Boolean).join(" ")
}
