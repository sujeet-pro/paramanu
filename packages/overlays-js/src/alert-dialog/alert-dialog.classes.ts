import type {
  AlertDialogClassesOptions,
  AlertDialogHeaderClassesOptions,
  AlertDialogBodyClassesOptions,
  AlertDialogFooterClassesOptions,
} from "./alert-dialog.types.js"

const BASE = "pm-alert-dialog"

/**
 * Returns BEM class names for the alert dialog container.
 */
export function alertDialogClasses(options: AlertDialogClassesOptions = {}): string {
  const { variant = "info" } = options
  const classes = [BASE, `${BASE}--${variant}`]

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the alert dialog container.
 */
export function alertDialogModuleClasses(
  classMap: Record<string, string>,
  options: AlertDialogClassesOptions = {},
): string {
  const { variant = "info" } = options

  const classes = [classMap["pm-alert-dialog"], classMap[`pm-alert-dialog--${variant}`]]

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for the alert dialog header.
 */
export function alertDialogHeaderClasses(_options: AlertDialogHeaderClassesOptions = {}): string {
  return `${BASE}__header`
}

/**
 * Returns CSS module class names for the alert dialog header.
 */
export function alertDialogHeaderModuleClasses(
  classMap: Record<string, string>,
  _options: AlertDialogHeaderClassesOptions = {},
): string {
  return classMap["pm-alert-dialog__header"] ?? ""
}

/**
 * Returns BEM class names for the alert dialog body.
 */
export function alertDialogBodyClasses(_options: AlertDialogBodyClassesOptions = {}): string {
  return `${BASE}__body`
}

/**
 * Returns CSS module class names for the alert dialog body.
 */
export function alertDialogBodyModuleClasses(
  classMap: Record<string, string>,
  _options: AlertDialogBodyClassesOptions = {},
): string {
  return classMap["pm-alert-dialog__body"] ?? ""
}

/**
 * Returns BEM class names for the alert dialog footer.
 */
export function alertDialogFooterClasses(_options: AlertDialogFooterClassesOptions = {}): string {
  return `${BASE}__footer`
}

/**
 * Returns CSS module class names for the alert dialog footer.
 */
export function alertDialogFooterModuleClasses(
  classMap: Record<string, string>,
  _options: AlertDialogFooterClassesOptions = {},
): string {
  return classMap["pm-alert-dialog__footer"] ?? ""
}
