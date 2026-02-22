import type {
  CmdPaletteClassesOptions,
  CmdPaletteInputClassesOptions,
  CmdPaletteListClassesOptions,
  CmdPaletteItemClassesOptions,
  CmdPaletteGroupClassesOptions,
  CmdPaletteEmptyClassesOptions,
} from "./command-palette.types.js"

const BASE = "pm-cmd-palette"

/**
 * Returns BEM class names for the command palette container.
 */
export function cmdPaletteClasses(_options: CmdPaletteClassesOptions = {}): string {
  return BASE
}

/**
 * Returns CSS module class names for the command palette container.
 */
export function cmdPaletteModuleClasses(
  classMap: Record<string, string>,
  _options: CmdPaletteClassesOptions = {},
): string {
  return classMap["pm-cmd-palette"] ?? ""
}

/**
 * Returns BEM class names for the command palette input.
 */
export function commandPaletteInputClasses(_options: CmdPaletteInputClassesOptions = {}): string {
  return `${BASE}__input`
}

/**
 * Returns CSS module class names for the command palette input.
 */
export function commandPaletteInputModuleClasses(
  classMap: Record<string, string>,
  _options: CmdPaletteInputClassesOptions = {},
): string {
  return classMap["pm-cmd-palette__input"] ?? ""
}

/**
 * Returns BEM class names for the command palette list.
 */
export function commandPaletteListClasses(_options: CmdPaletteListClassesOptions = {}): string {
  return `${BASE}__list`
}

/**
 * Returns CSS module class names for the command palette list.
 */
export function commandPaletteListModuleClasses(
  classMap: Record<string, string>,
  _options: CmdPaletteListClassesOptions = {},
): string {
  return classMap["pm-cmd-palette__list"] ?? ""
}

/**
 * Returns BEM class names for the command palette item.
 */
export function cmdPaletteItemClasses(options: CmdPaletteItemClassesOptions = {}): string {
  const { active = false } = options
  const classes = [`${BASE}__item`]

  if (active) classes.push(`${BASE}__item--active`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the command palette item.
 */
export function cmdPaletteItemModuleClasses(
  classMap: Record<string, string>,
  options: CmdPaletteItemClassesOptions = {},
): string {
  const { active = false } = options
  const classes = [classMap["pm-cmd-palette__item"]]

  if (active) classes.push(classMap["pm-cmd-palette__item--active"])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for the command palette group.
 */
export function commandPaletteGroupClasses(_options: CmdPaletteGroupClassesOptions = {}): string {
  return `${BASE}__group`
}

/**
 * Returns CSS module class names for the command palette group.
 */
export function commandPaletteGroupModuleClasses(
  classMap: Record<string, string>,
  _options: CmdPaletteGroupClassesOptions = {},
): string {
  return classMap["pm-cmd-palette__group"] ?? ""
}

/**
 * Returns BEM class names for the command palette empty state.
 */
export function commandPaletteEmptyClasses(_options: CmdPaletteEmptyClassesOptions = {}): string {
  return `${BASE}__empty`
}

/**
 * Returns CSS module class names for the command palette empty state.
 */
export function commandPaletteEmptyModuleClasses(
  classMap: Record<string, string>,
  _options: CmdPaletteEmptyClassesOptions = {},
): string {
  return classMap["pm-cmd-palette__empty"] ?? ""
}
