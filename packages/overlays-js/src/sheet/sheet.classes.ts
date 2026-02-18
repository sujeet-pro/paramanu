import type {
  SheetClassesOptions,
  SheetHeaderClassesOptions,
  SheetBodyClassesOptions,
  SheetHandleClassesOptions,
} from "./sheet.types.js"

const BASE = "pm-sheet"

/**
 * Returns BEM class names for the sheet component (human-readable).
 * Used by CDN and template consumers.
 */
export function sheetClasses(options: SheetClassesOptions = {}): string {
  const { size = "md" } = options
  const classes = [BASE, `${BASE}--${size}`]
  return classes.join(" ")
}

/**
 * Returns CSS module class names for the sheet component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function sheetModuleClasses(
  classMap: Record<string, string>,
  options: SheetClassesOptions = {},
): string {
  const { size = "md" } = options
  const classes = [classMap["pm-sheet"], classMap[`pm-sheet--${size}`]]
  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for the sheet header (human-readable).
 */
export function sheetHeaderClasses(_options: SheetHeaderClassesOptions = {}): string {
  return `${BASE}__header`
}

/**
 * Returns CSS module class names for the sheet header (hashed).
 */
export function sheetHeaderModuleClasses(
  classMap: Record<string, string>,
  _options: SheetHeaderClassesOptions = {},
): string {
  return classMap["pm-sheet__header"] ?? ""
}

/**
 * Returns BEM class names for the sheet body (human-readable).
 */
export function sheetBodyClasses(_options: SheetBodyClassesOptions = {}): string {
  return `${BASE}__body`
}

/**
 * Returns CSS module class names for the sheet body (hashed).
 */
export function sheetBodyModuleClasses(
  classMap: Record<string, string>,
  _options: SheetBodyClassesOptions = {},
): string {
  return classMap["pm-sheet__body"] ?? ""
}

/**
 * Returns BEM class names for the sheet handle (human-readable).
 */
export function sheetHandleClasses(_options: SheetHandleClassesOptions = {}): string {
  return `${BASE}__handle`
}

/**
 * Returns CSS module class names for the sheet handle (hashed).
 */
export function sheetHandleModuleClasses(
  classMap: Record<string, string>,
  _options: SheetHandleClassesOptions = {},
): string {
  return classMap["pm-sheet__handle"] ?? ""
}
