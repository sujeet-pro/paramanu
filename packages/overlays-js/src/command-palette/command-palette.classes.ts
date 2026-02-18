import type {
  CommandPaletteClassesOptions,
  CommandPaletteInputClassesOptions,
  CommandPaletteListClassesOptions,
  CommandPaletteItemClassesOptions,
  CommandPaletteGroupClassesOptions,
  CommandPaletteEmptyClassesOptions,
} from "./command-palette.types.js"

const BASE = "pm-command-palette"

/**
 * Returns BEM class names for the command palette container.
 */
export function commandPaletteClasses(_options: CommandPaletteClassesOptions = {}): string {
  return BASE
}

/**
 * Returns CSS module class names for the command palette container.
 */
export function commandPaletteModuleClasses(
  classMap: Record<string, string>,
  _options: CommandPaletteClassesOptions = {},
): string {
  return classMap["pm-command-palette"] ?? ""
}

/**
 * Returns BEM class names for the command palette input.
 */
export function commandPaletteInputClasses(
  _options: CommandPaletteInputClassesOptions = {},
): string {
  return `${BASE}__input`
}

/**
 * Returns CSS module class names for the command palette input.
 */
export function commandPaletteInputModuleClasses(
  classMap: Record<string, string>,
  _options: CommandPaletteInputClassesOptions = {},
): string {
  return classMap["pm-command-palette__input"] ?? ""
}

/**
 * Returns BEM class names for the command palette list.
 */
export function commandPaletteListClasses(
  _options: CommandPaletteListClassesOptions = {},
): string {
  return `${BASE}__list`
}

/**
 * Returns CSS module class names for the command palette list.
 */
export function commandPaletteListModuleClasses(
  classMap: Record<string, string>,
  _options: CommandPaletteListClassesOptions = {},
): string {
  return classMap["pm-command-palette__list"] ?? ""
}

/**
 * Returns BEM class names for the command palette item.
 */
export function commandPaletteItemClasses(
  options: CommandPaletteItemClassesOptions = {},
): string {
  const { active = false } = options
  const classes = [`${BASE}__item`]

  if (active) classes.push(`${BASE}__item--active`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the command palette item.
 */
export function commandPaletteItemModuleClasses(
  classMap: Record<string, string>,
  options: CommandPaletteItemClassesOptions = {},
): string {
  const { active = false } = options
  const classes = [classMap["pm-command-palette__item"]]

  if (active) classes.push(classMap["pm-command-palette__item--active"])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for the command palette group.
 */
export function commandPaletteGroupClasses(
  _options: CommandPaletteGroupClassesOptions = {},
): string {
  return `${BASE}__group`
}

/**
 * Returns CSS module class names for the command palette group.
 */
export function commandPaletteGroupModuleClasses(
  classMap: Record<string, string>,
  _options: CommandPaletteGroupClassesOptions = {},
): string {
  return classMap["pm-command-palette__group"] ?? ""
}

/**
 * Returns BEM class names for the command palette empty state.
 */
export function commandPaletteEmptyClasses(
  _options: CommandPaletteEmptyClassesOptions = {},
): string {
  return `${BASE}__empty`
}

/**
 * Returns CSS module class names for the command palette empty state.
 */
export function commandPaletteEmptyModuleClasses(
  classMap: Record<string, string>,
  _options: CommandPaletteEmptyClassesOptions = {},
): string {
  return classMap["pm-command-palette__empty"] ?? ""
}
