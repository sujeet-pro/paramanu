import type { ProgressBarClassesOptions } from "./progress-bar.types.js"

const BASE = "pm-progress-bar"

/**
 * Returns BEM class names for the progress bar component (human-readable).
 * Returns an object with classes for root, track, and fill sub-elements.
 * Used by CDN and template consumers.
 */
export function progressBarClasses(options: ProgressBarClassesOptions = {}): {
  root: string
  track: string
  fill: string
} {
  const {
    size = "md",
    variant = "primary",
    striped = false,
    animated = false,
    indeterminate = false,
  } = options

  const rootClasses = [BASE, `${BASE}--${size}`, `${BASE}--${variant}`]

  if (striped) rootClasses.push(`${BASE}--striped`)
  if (animated) rootClasses.push(`${BASE}--animated`)
  if (indeterminate) rootClasses.push(`${BASE}--indeterminate`)

  return {
    root: rootClasses.join(" "),
    track: `${BASE}__track`,
    fill: `${BASE}__fill`,
  }
}

/**
 * Returns CSS module class names for the progress bar component (hashed).
 * Returns an object with classes for root, track, and fill sub-elements.
 * Used by bundled/template consumers who import CSS modules.
 */
export function progressBarModuleClasses(
  classMap: Record<string, string>,
  options: ProgressBarClassesOptions = {},
): {
  root: string
  track: string
  fill: string
} {
  const {
    size = "md",
    variant = "primary",
    striped = false,
    animated = false,
    indeterminate = false,
  } = options

  const rootClasses = [
    classMap["pm-progress-bar"],
    classMap[`pm-progress-bar--${size}`],
    classMap[`pm-progress-bar--${variant}`],
  ]

  if (striped) rootClasses.push(classMap["pm-progress-bar--striped"])
  if (animated) rootClasses.push(classMap["pm-progress-bar--animated"])
  if (indeterminate) rootClasses.push(classMap["pm-progress-bar--indeterminate"])

  return {
    root: rootClasses.filter(Boolean).join(" "),
    track: classMap["pm-progress-bar__track"] || "",
    fill: classMap["pm-progress-bar__fill"] || "",
  }
}
