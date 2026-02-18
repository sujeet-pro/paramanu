import type { ContainerClassesOptions } from "./container.types.js"

const BASE = "pm-container"

/**
 * Returns BEM class names for the container component (human-readable).
 * Used by CDN and template consumers.
 */
export function containerClasses(options: ContainerClassesOptions = {}): string {
  const { size = "lg", fluid, px, center } = options
  const classes = [BASE]

  if (fluid) {
    classes.push(`${BASE}--fluid`)
  } else {
    classes.push(`${BASE}--${size}`)
  }

  if (px !== undefined) classes.push(`${BASE}--px-${px}`)
  if (center) classes.push(`${BASE}--center`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the container component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function containerModuleClasses(
  classMap: Record<string, string>,
  options: ContainerClassesOptions = {},
): string {
  const { size = "lg", fluid, px, center } = options

  const classes = [classMap["pm-container"]]

  if (fluid) {
    classes.push(classMap["pm-container--fluid"])
  } else {
    classes.push(classMap[`pm-container--${size}`])
  }

  if (px !== undefined) classes.push(classMap[`pm-container--px-${px}`])
  if (center) classes.push(classMap["pm-container--center"])

  return classes.filter(Boolean).join(" ")
}
