import type { EditableTextClassesOptions } from "./editable-text.types.js"

const BASE = "pm-editable-text"

/**
 * Returns BEM class names for the editable text component (human-readable).
 */
export function editableTextClasses(options: EditableTextClassesOptions = {}): string {
  const { size = "md", disabled = false, editing = false } = options
  const classes = [BASE, `${BASE}--${size}`]

  if (disabled) classes.push(`${BASE}--disabled`)
  if (editing) classes.push(`${BASE}--editing`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the editable text component (hashed).
 */
export function editableTextModuleClasses(
  classMap: Record<string, string>,
  options: EditableTextClassesOptions = {},
): string {
  const { size = "md", disabled = false, editing = false } = options

  const classes = [classMap["pm-editable-text"], classMap[`pm-editable-text--${size}`]]

  if (disabled) classes.push(classMap["pm-editable-text--disabled"])
  if (editing) classes.push(classMap["pm-editable-text--editing"])

  return classes.filter(Boolean).join(" ")
}
