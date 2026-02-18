import type { DropzoneClassesOptions } from "./dropzone.types.js"

const BASE = "pm-dropzone"

/**
 * Returns BEM class names for the dropzone component (human-readable).
 */
export function dropzoneClasses(options: DropzoneClassesOptions = {}): string {
  const { disabled = false, dragging = false } = options
  const classes = [BASE]

  if (disabled) classes.push(`${BASE}--disabled`)
  if (dragging) classes.push(`${BASE}--dragging`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the dropzone component (hashed).
 */
export function dropzoneModuleClasses(
  classMap: Record<string, string>,
  options: DropzoneClassesOptions = {},
): string {
  const { disabled = false, dragging = false } = options

  const classes = [classMap["pm-dropzone"]]

  if (disabled) classes.push(classMap["pm-dropzone--disabled"])
  if (dragging) classes.push(classMap["pm-dropzone--dragging"])

  return classes.filter(Boolean).join(" ")
}
