import type { ContainerClassesOptions } from "./container.types.js"

const BASE = "pm-container"

/**
 * Returns BEM class names for the container component (human-readable).
 * Used by CDN and template consumers.
 */
export function containerClasses(options: ContainerClassesOptions = {}): string {
  const { size = "md" } = options
  const classes = [BASE, `${BASE}--${size}`]

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
  const { size = "md" } = options

  const classes = [classMap["pm-container"], classMap[`pm-container--${size}`]]

  return classes.filter(Boolean).join(" ")
}
