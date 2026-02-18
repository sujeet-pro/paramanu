import type { SkeletonClassesOptions } from "./skeleton.types.js"

const BASE = "pm-skeleton"

/**
 * Returns BEM class names for the skeleton component (human-readable).
 * Used by CDN and template consumers.
 */
export function skeletonClasses(options: SkeletonClassesOptions = {}): string {
  const { variant = "text", size = "md" } = options
  const classes = [BASE, `${BASE}--${variant}`]

  if (variant === "circular") {
    classes.push(`${BASE}--${size}`)
  }

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the skeleton component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function skeletonModuleClasses(
  classMap: Record<string, string>,
  options: SkeletonClassesOptions = {},
): string {
  const { variant = "text", size = "md" } = options

  const classes = [classMap["pm-skeleton"], classMap[`pm-skeleton--${variant}`]]

  if (variant === "circular") {
    classes.push(classMap[`pm-skeleton--${size}`])
  }

  return classes.filter(Boolean).join(" ")
}
