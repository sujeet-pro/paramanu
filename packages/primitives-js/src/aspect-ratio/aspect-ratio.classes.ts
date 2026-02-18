import type { AspectRatioClassesOptions } from "./aspect-ratio.types.js"

const BASE = "pm-aspect-ratio"

function ratioToModifier(ratio: string): string {
  return ratio.replace("/", "-")
}

/**
 * Returns BEM class names for the aspect-ratio component (human-readable).
 * Used by CDN and template consumers.
 */
export function aspectRatioClasses(options: AspectRatioClassesOptions = {}): string {
  const { ratio = "16/9" } = options
  const classes = [BASE, `${BASE}--${ratioToModifier(ratio)}`]

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the aspect-ratio component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function aspectRatioModuleClasses(
  classMap: Record<string, string>,
  options: AspectRatioClassesOptions = {},
): string {
  const { ratio = "16/9" } = options

  const classes = [classMap["pm-aspect-ratio"], classMap[`pm-aspect-ratio--${ratioToModifier(ratio)}`]]

  return classes.filter(Boolean).join(" ")
}
