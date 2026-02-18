import type { CircularProgressClassesOptions } from "./circular-progress.types.js"

const BASE = "pm-circular-progress"

/**
 * Returns BEM class names for the circular progress component (human-readable).
 * Returns an object with classes for root, svg, track, and fill sub-elements.
 * Used by CDN and template consumers.
 */
export function circularProgressClasses(options: CircularProgressClassesOptions = {}): {
  root: string
  svg: string
  track: string
  fill: string
} {
  const { size = "md", variant = "primary", indeterminate = false } = options

  const rootClasses = [BASE, `${BASE}--${size}`, `${BASE}--${variant}`]

  if (indeterminate) rootClasses.push(`${BASE}--indeterminate`)

  return {
    root: rootClasses.join(" "),
    svg: `${BASE}__svg`,
    track: `${BASE}__track`,
    fill: `${BASE}__fill`,
  }
}

/**
 * Returns CSS module class names for the circular progress component (hashed).
 * Returns an object with classes for root, svg, track, and fill sub-elements.
 * Used by bundled/template consumers who import CSS modules.
 */
export function circularProgressModuleClasses(
  classMap: Record<string, string>,
  options: CircularProgressClassesOptions = {},
): {
  root: string
  svg: string
  track: string
  fill: string
} {
  const { size = "md", variant = "primary", indeterminate = false } = options

  const rootClasses = [
    classMap["pm-circular-progress"],
    classMap[`pm-circular-progress--${size}`],
    classMap[`pm-circular-progress--${variant}`],
  ]

  if (indeterminate) rootClasses.push(classMap["pm-circular-progress--indeterminate"])

  return {
    root: rootClasses.filter(Boolean).join(" "),
    svg: classMap["pm-circular-progress__svg"] || "",
    track: classMap["pm-circular-progress__track"] || "",
    fill: classMap["pm-circular-progress__fill"] || "",
  }
}
