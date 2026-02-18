import type { SegmentedControlClassesOptions } from "./segmented-control.types.js"

const BASE = "pm-segmented-control"

/**
 * Returns BEM class names for the segmented control component (human-readable).
 */
export function segmentedControlClasses(options: SegmentedControlClassesOptions = {}): string {
  const { size = "md", fullWidth = false } = options
  const classes = [BASE, `${BASE}--${size}`]

  if (fullWidth) classes.push(`${BASE}--full-width`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the segmented control component (hashed).
 */
export function segmentedControlModuleClasses(
  classMap: Record<string, string>,
  options: SegmentedControlClassesOptions = {},
): string {
  const { size = "md", fullWidth = false } = options

  const classes = [classMap["pm-segmented-control"], classMap[`pm-segmented-control--${size}`]]

  if (fullWidth) classes.push(classMap["pm-segmented-control--full-width"])

  return classes.filter(Boolean).join(" ")
}
