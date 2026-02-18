import type { BackdropClassesOptions } from "./backdrop.types.js"

const BASE = "pm-backdrop"

/**
 * Returns BEM class names for the backdrop component (human-readable).
 * Used by CDN and template consumers.
 */
export function backdropClasses(options: BackdropClassesOptions = {}): string {
  const { variant = "default", visible = false } = options
  const classes = [BASE, `${BASE}--${variant}`]

  if (visible) classes.push(`${BASE}--visible`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the backdrop component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function backdropModuleClasses(
  classMap: Record<string, string>,
  options: BackdropClassesOptions = {},
): string {
  const { variant = "default", visible = false } = options

  const classes = [classMap["pm-backdrop"], classMap[`pm-backdrop--${variant}`]]

  if (visible) classes.push(classMap["pm-backdrop--visible"])

  return classes.filter(Boolean).join(" ")
}
