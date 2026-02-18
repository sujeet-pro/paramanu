import type { SpacerClassesOptions } from "./spacer.types.js"

const BASE = "pm-spacer"

/**
 * Returns BEM class names for the spacer component (human-readable).
 * Used by CDN and template consumers.
 */
export function spacerClasses(options: SpacerClassesOptions = {}): string {
  const { size, axis } = options
  const classes = [BASE]

  if (size !== undefined) classes.push(`${BASE}--size-${size}`)
  if (axis) classes.push(`${BASE}--${axis}`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the spacer component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function spacerModuleClasses(
  classMap: Record<string, string>,
  options: SpacerClassesOptions = {},
): string {
  const { size, axis } = options
  const classes = [classMap["pm-spacer"]]

  if (size !== undefined) classes.push(classMap[`pm-spacer--size-${size}`])
  if (axis) classes.push(classMap[`pm-spacer--${axis}`])

  return classes.filter(Boolean).join(" ")
}
