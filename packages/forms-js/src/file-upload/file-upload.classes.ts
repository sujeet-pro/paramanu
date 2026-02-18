import type { FileUploadClassesOptions } from "./file-upload.types.js"

const BASE = "pm-file-upload"

/**
 * Returns BEM class names for the file upload component (human-readable).
 */
export function fileUploadClasses(options: FileUploadClassesOptions = {}): string {
  const { size = "md", disabled = false } = options
  const classes = [BASE, `${BASE}--${size}`]

  if (disabled) classes.push(`${BASE}--disabled`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the file upload component (hashed).
 */
export function fileUploadModuleClasses(
  classMap: Record<string, string>,
  options: FileUploadClassesOptions = {},
): string {
  const { size = "md", disabled = false } = options

  const classes = [classMap["pm-file-upload"], classMap[`pm-file-upload--${size}`]]

  if (disabled) classes.push(classMap["pm-file-upload--disabled"])

  return classes.filter(Boolean).join(" ")
}
