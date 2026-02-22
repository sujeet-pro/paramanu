import type { InlineDlgClassesOptions, InlineDlgBodyClassesOptions } from "./inline-dialog.types.js"

const BASE = "pm-inline-dlg"

/**
 * Returns BEM class names for the inline dialog component (human-readable).
 * Used by CDN and template consumers.
 */
export function inlineDlgClasses(options: InlineDlgClassesOptions = {}): string {
  const { visible = false } = options
  const classes = [BASE]

  if (visible) classes.push(`${BASE}--visible`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the inline dialog component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function inlineDlgModuleClasses(
  classMap: Record<string, string>,
  options: InlineDlgClassesOptions = {},
): string {
  const { visible = false } = options

  const classes = [classMap["pm-inline-dlg"]]

  if (visible) classes.push(classMap["pm-inline-dlg--visible"])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for the inline dialog body.
 */
export function inlineDialogBodyClasses(_options: InlineDlgBodyClassesOptions = {}): string {
  return `${BASE}__body`
}

/**
 * Returns CSS module class names for the inline dialog body.
 */
export function inlineDialogBodyModuleClasses(
  classMap: Record<string, string>,
  _options: InlineDlgBodyClassesOptions = {},
): string {
  return classMap["pm-inline-dlg__body"] ?? ""
}
