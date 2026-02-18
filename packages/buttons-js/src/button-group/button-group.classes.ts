import type { ButtonGroupClassesOptions } from "./button-group.types.js"

const BASE = "pm-button-group"

/**
 * Returns BEM class names for the button group component (human-readable).
 * Used by CDN and template consumers.
 */
export function buttonGroupClasses(options: ButtonGroupClassesOptions = {}): string {
  const { orientation = "horizontal", attached = false } = options
  const classes = [BASE, `${BASE}--${orientation}`]

  if (attached) classes.push(`${BASE}--attached`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the button group component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function buttonGroupModuleClasses(
  classMap: Record<string, string>,
  options: ButtonGroupClassesOptions = {},
): string {
  const { orientation = "horizontal", attached = false } = options

  const classes = [classMap["pm-button-group"], classMap[`pm-button-group--${orientation}`]]

  if (attached) classes.push(classMap["pm-button-group--attached"])

  return classes.filter(Boolean).join(" ")
}
