import type { UploadClassesOptions } from "./file-upload.types.js"

const BASE = "pm-upload"

/**
 * Returns BEM class names for the file upload component (human-readable).
 */
export function uploadClasses(options: UploadClassesOptions = {}): string {
  const { size = "md", disabled = false } = options
  const classes = [BASE, `${BASE}--${size}`]

  if (disabled) classes.push(`${BASE}--disabled`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the file upload component (hashed).
 */
export function uploadModuleClasses(
  classMap: Record<string, string>,
  options: UploadClassesOptions = {},
): string {
  const { size = "md", disabled = false } = options

  const classes = [classMap["pm-upload"], classMap[`pm-upload--${size}`]]

  if (disabled) classes.push(classMap["pm-upload--disabled"])

  return classes.filter(Boolean).join(" ")
}
