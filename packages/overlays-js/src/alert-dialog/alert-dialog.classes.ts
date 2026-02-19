import type {
  AlertdialogClassesOptions,
  AlertdialogHeaderClassesOptions,
  AlertdialogBodyClassesOptions,
  AlertdialogFooterClassesOptions,
} from "./alert-dialog.types.js"

const BASE = "pm-alertdialog"

/**
 * Returns BEM class names for the alert dialog container.
 */
export function alertdialogClasses(options: AlertdialogClassesOptions = {}): string {
  const { variant = "info" } = options
  const classes = [BASE, `${BASE}--${variant}`]

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the alert dialog container.
 */
export function alertdialogModuleClasses(
  classMap: Record<string, string>,
  options: AlertdialogClassesOptions = {},
): string {
  const { variant = "info" } = options

  const classes = [classMap["pm-alertdialog"], classMap[`pm-alertdialog--${variant}`]]

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for the alert dialog header.
 */
export function alertDialogHeaderClasses(_options: AlertdialogHeaderClassesOptions = {}): string {
  return `${BASE}__header`
}

/**
 * Returns CSS module class names for the alert dialog header.
 */
export function alertDialogHeaderModuleClasses(
  classMap: Record<string, string>,
  _options: AlertdialogHeaderClassesOptions = {},
): string {
  return classMap["pm-alertdialog__header"] ?? ""
}

/**
 * Returns BEM class names for the alert dialog body.
 */
export function alertDialogBodyClasses(_options: AlertdialogBodyClassesOptions = {}): string {
  return `${BASE}__body`
}

/**
 * Returns CSS module class names for the alert dialog body.
 */
export function alertDialogBodyModuleClasses(
  classMap: Record<string, string>,
  _options: AlertdialogBodyClassesOptions = {},
): string {
  return classMap["pm-alertdialog__body"] ?? ""
}

/**
 * Returns BEM class names for the alert dialog footer.
 */
export function alertDialogFooterClasses(_options: AlertdialogFooterClassesOptions = {}): string {
  return `${BASE}__footer`
}

/**
 * Returns CSS module class names for the alert dialog footer.
 */
export function alertDialogFooterModuleClasses(
  classMap: Record<string, string>,
  _options: AlertdialogFooterClassesOptions = {},
): string {
  return classMap["pm-alertdialog__footer"] ?? ""
}
