import type { TextareaClassesOptions } from "./textarea.types.js"

const BASE = "pm-textarea"

/**
 * Returns BEM class names for the textarea component (human-readable).
 */
export function textareaClasses(options: TextareaClassesOptions = {}): string {
  const {
    variant = "outline",
    size = "md",
    invalid = false,
    disabled = false,
    readOnly = false,
    fullWidth = false,
    resize = "vertical",
    autosize = false,
  } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`, `${BASE}--resize-${resize}`]

  if (invalid) classes.push(`${BASE}--invalid`)
  if (disabled) classes.push(`${BASE}--disabled`)
  if (readOnly) classes.push(`${BASE}--read-only`)
  if (fullWidth) classes.push(`${BASE}--full-width`)
  if (autosize) classes.push(`${BASE}--autosize`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the textarea component (hashed).
 */
export function textareaModuleClasses(
  classMap: Record<string, string>,
  options: TextareaClassesOptions = {},
): string {
  const {
    variant = "outline",
    size = "md",
    invalid = false,
    disabled = false,
    readOnly = false,
    fullWidth = false,
    resize = "vertical",
    autosize = false,
  } = options

  const classes = [
    classMap["pm-textarea"],
    classMap[`pm-textarea--${variant}`],
    classMap[`pm-textarea--${size}`],
    classMap[`pm-textarea--resize-${resize}`],
  ]

  if (invalid) classes.push(classMap["pm-textarea--invalid"])
  if (disabled) classes.push(classMap["pm-textarea--disabled"])
  if (readOnly) classes.push(classMap["pm-textarea--read-only"])
  if (fullWidth) classes.push(classMap["pm-textarea--full-width"])
  if (autosize) classes.push(classMap["pm-textarea--autosize"])

  return classes.filter(Boolean).join(" ")
}
