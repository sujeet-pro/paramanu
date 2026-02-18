import type {
  DialogClassesOptions,
  DialogHeaderClassesOptions,
  DialogBodyClassesOptions,
  DialogFooterClassesOptions,
} from "./dialog.types.js"

const BASE = "pm-dialog"

/**
 * Returns BEM class names for the dialog container.
 */
export function dialogClasses(options: DialogClassesOptions = {}): string {
  const { size = "md", centered = false, scrollBehavior = "outside" } = options
  const classes = [BASE, `${BASE}--${size}`]

  if (centered) classes.push(`${BASE}--centered`)
  if (scrollBehavior === "inside") classes.push(`${BASE}--scroll-inside`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the dialog container.
 */
export function dialogModuleClasses(
  classMap: Record<string, string>,
  options: DialogClassesOptions = {},
): string {
  const { size = "md", centered = false, scrollBehavior = "outside" } = options

  const classes = [classMap["pm-dialog"], classMap[`pm-dialog--${size}`]]

  if (centered) classes.push(classMap["pm-dialog--centered"])
  if (scrollBehavior === "inside") classes.push(classMap["pm-dialog--scroll-inside"])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for the dialog header.
 */
export function dialogHeaderClasses(_options: DialogHeaderClassesOptions = {}): string {
  return `${BASE}__header`
}

/**
 * Returns CSS module class names for the dialog header.
 */
export function dialogHeaderModuleClasses(
  classMap: Record<string, string>,
  _options: DialogHeaderClassesOptions = {},
): string {
  return classMap["pm-dialog__header"] ?? ""
}

/**
 * Returns BEM class names for the dialog body.
 */
export function dialogBodyClasses(options: DialogBodyClassesOptions = {}): string {
  const { scrollBehavior } = options
  const classes = [`${BASE}__body`]

  if (scrollBehavior) classes.push(`${BASE}__body--scroll-${scrollBehavior}`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the dialog body.
 */
export function dialogBodyModuleClasses(
  classMap: Record<string, string>,
  options: DialogBodyClassesOptions = {},
): string {
  const { scrollBehavior } = options

  const classes = [classMap["pm-dialog__body"]]

  if (scrollBehavior) classes.push(classMap[`pm-dialog__body--scroll-${scrollBehavior}`])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for the dialog footer.
 */
export function dialogFooterClasses(_options: DialogFooterClassesOptions = {}): string {
  return `${BASE}__footer`
}

/**
 * Returns CSS module class names for the dialog footer.
 */
export function dialogFooterModuleClasses(
  classMap: Record<string, string>,
  _options: DialogFooterClassesOptions = {},
): string {
  return classMap["pm-dialog__footer"] ?? ""
}
