import type { DividerClassesOptions } from "./divider.types.js"

const BASE = "pm-divider"

/**
 * Returns BEM class names for the divider component (human-readable).
 * Used by CDN and template consumers.
 */
export function dividerClasses(options: DividerClassesOptions = {}): string {
  const { orientation = "horizontal", variant = "solid", withLabel, labelPosition, my } = options
  const classes = [BASE, `${BASE}--${orientation}`, `${BASE}--${variant}`]

  if (withLabel) {
    classes.push(`${BASE}--with-label`)
    if (labelPosition && labelPosition !== "center") {
      classes.push(`${BASE}--label-${labelPosition}`)
    }
  }
  if (my !== undefined) classes.push(`${BASE}--my-${my}`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the divider component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function dividerModuleClasses(
  classMap: Record<string, string>,
  options: DividerClassesOptions = {},
): string {
  const { orientation = "horizontal", variant = "solid", withLabel, labelPosition, my } = options

  const classes = [
    classMap["pm-divider"],
    classMap[`pm-divider--${orientation}`],
    classMap[`pm-divider--${variant}`],
  ]

  if (withLabel) {
    classes.push(classMap["pm-divider--with-label"])
    if (labelPosition && labelPosition !== "center") {
      classes.push(classMap[`pm-divider--label-${labelPosition}`])
    }
  }
  if (my !== undefined) classes.push(classMap[`pm-divider--my-${my}`])

  return classes.filter(Boolean).join(" ")
}
