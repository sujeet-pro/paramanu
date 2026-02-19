import type { EditableClassesOptions } from "./editable-text.types.js"

const BASE = "pm-editable"

/**
 * Returns BEM class names for the editable text component (human-readable).
 */
export function editableClasses(options: EditableClassesOptions = {}): string {
  const { size = "md", disabled = false, editing = false } = options
  const classes = [BASE, `${BASE}--${size}`]

  if (disabled) classes.push(`${BASE}--disabled`)
  if (editing) classes.push(`${BASE}--editing`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the editable text component (hashed).
 */
export function editableModuleClasses(
  classMap: Record<string, string>,
  options: EditableClassesOptions = {},
): string {
  const { size = "md", disabled = false, editing = false } = options

  const classes = [classMap["pm-editable"], classMap[`pm-editable--${size}`]]

  if (disabled) classes.push(classMap["pm-editable--disabled"])
  if (editing) classes.push(classMap["pm-editable--editing"])

  return classes.filter(Boolean).join(" ")
}
