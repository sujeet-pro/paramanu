import type {
  DrawerClassesOptions,
  DrawerHeaderClassesOptions,
  DrawerBodyClassesOptions,
  DrawerFooterClassesOptions,
} from "./drawer.types.js"

const BASE = "pm-drawer"

/**
 * Returns BEM class names for the drawer component (human-readable).
 * Used by CDN and template consumers.
 */
export function drawerClasses(options: DrawerClassesOptions = {}): string {
  const { placement = "end", size = "md" } = options
  const classes = [BASE, `${BASE}--${placement}`, `${BASE}--${size}`]
  return classes.join(" ")
}

/**
 * Returns CSS module class names for the drawer component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function drawerModuleClasses(
  classMap: Record<string, string>,
  options: DrawerClassesOptions = {},
): string {
  const { placement = "end", size = "md" } = options
  const classes = [
    classMap["pm-drawer"],
    classMap[`pm-drawer--${placement}`],
    classMap[`pm-drawer--${size}`],
  ]
  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for the drawer header (human-readable).
 */
export function drawerHeaderClasses(_options: DrawerHeaderClassesOptions = {}): string {
  return `${BASE}__header`
}

/**
 * Returns CSS module class names for the drawer header (hashed).
 */
export function drawerHeaderModuleClasses(
  classMap: Record<string, string>,
  _options: DrawerHeaderClassesOptions = {},
): string {
  return classMap["pm-drawer__header"] ?? ""
}

/**
 * Returns BEM class names for the drawer body (human-readable).
 */
export function drawerBodyClasses(_options: DrawerBodyClassesOptions = {}): string {
  return `${BASE}__body`
}

/**
 * Returns CSS module class names for the drawer body (hashed).
 */
export function drawerBodyModuleClasses(
  classMap: Record<string, string>,
  _options: DrawerBodyClassesOptions = {},
): string {
  return classMap["pm-drawer__body"] ?? ""
}

/**
 * Returns BEM class names for the drawer footer (human-readable).
 */
export function drawerFooterClasses(_options: DrawerFooterClassesOptions = {}): string {
  return `${BASE}__footer`
}

/**
 * Returns CSS module class names for the drawer footer (hashed).
 */
export function drawerFooterModuleClasses(
  classMap: Record<string, string>,
  _options: DrawerFooterClassesOptions = {},
): string {
  return classMap["pm-drawer__footer"] ?? ""
}
