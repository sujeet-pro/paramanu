import type {
  InlineDialogClassesOptions,
  InlineDialogBodyClassesOptions,
} from "./inline-dialog.types.js"

const BASE = "pm-inline-dialog"

/**
 * Returns BEM class names for the inline dialog component (human-readable).
 * Used by CDN and template consumers.
 */
export function inlineDialogClasses(options: InlineDialogClassesOptions = {}): string {
  const { visible = false } = options
  const classes = [BASE]

  if (visible) classes.push(`${BASE}--visible`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the inline dialog component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function inlineDialogModuleClasses(
  classMap: Record<string, string>,
  options: InlineDialogClassesOptions = {},
): string {
  const { visible = false } = options

  const classes = [classMap["pm-inline-dialog"]]

  if (visible) classes.push(classMap["pm-inline-dialog--visible"])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for the inline dialog body.
 */
export function inlineDialogBodyClasses(_options: InlineDialogBodyClassesOptions = {}): string {
  return `${BASE}__body`
}

/**
 * Returns CSS module class names for the inline dialog body.
 */
export function inlineDialogBodyModuleClasses(
  classMap: Record<string, string>,
  _options: InlineDialogBodyClassesOptions = {},
): string {
  return classMap["pm-inline-dialog__body"] ?? ""
}
