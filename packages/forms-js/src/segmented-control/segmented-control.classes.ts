import type { SegCtrlClassesOptions } from "./segmented-control.types.js"

const BASE = "pm-seg-ctrl"

/**
 * Returns BEM class names for the segmented control component (human-readable).
 */
export function segCtrlClasses(options: SegCtrlClassesOptions = {}): string {
  const { size = "md", fullWidth = false } = options
  const classes = [BASE, `${BASE}--${size}`]

  if (fullWidth) classes.push(`${BASE}--full-width`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the segmented control component (hashed).
 */
export function segCtrlModuleClasses(
  classMap: Record<string, string>,
  options: SegCtrlClassesOptions = {},
): string {
  const { size = "md", fullWidth = false } = options

  const classes = [classMap["pm-seg-ctrl"], classMap[`pm-seg-ctrl--${size}`]]

  if (fullWidth) classes.push(classMap["pm-seg-ctrl--full-width"])

  return classes.filter(Boolean).join(" ")
}
