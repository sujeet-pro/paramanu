import type { MenuClassesOptions, MenuItemClassesOptions } from "./menu.types.js"

const BASE = "pm-menu"

export function menuClasses(options: MenuClassesOptions = {}): string {
  const { size = "md" } = options
  const classes = [BASE, `${BASE}--${size}`]
  return classes.join(" ")
}

export function menuModuleClasses(
  classMap: Record<string, string>,
  options: MenuClassesOptions = {},
): string {
  const { size = "md" } = options
  const classes = [classMap["pm-menu"], classMap[`pm-menu--${size}`]]
  return classes.filter(Boolean).join(" ")
}

export function menuItemClasses(options: MenuItemClassesOptions = {}): string {
  const { active = false, disabled = false, destructive = false } = options
  const classes = [`${BASE}__item`]
  if (active) classes.push(`${BASE}__item--active`)
  if (disabled) classes.push(`${BASE}__item--disabled`)
  if (destructive) classes.push(`${BASE}__item--destructive`)
  return classes.join(" ")
}

export function menuItemModuleClasses(
  classMap: Record<string, string>,
  options: MenuItemClassesOptions = {},
): string {
  const { active = false, disabled = false, destructive = false } = options
  const classes = [classMap["pm-menu__item"]]
  if (active) classes.push(classMap["pm-menu__item--active"])
  if (disabled) classes.push(classMap["pm-menu__item--disabled"])
  if (destructive) classes.push(classMap["pm-menu__item--destructive"])
  return classes.filter(Boolean).join(" ")
}

export function menuGroupClasses(): string {
  return `${BASE}__group`
}

export function menuGroupModuleClasses(classMap: Record<string, string>): string {
  return classMap["pm-menu__group"] || ""
}

export function menuGroupLabelClasses(): string {
  return `${BASE}__group-label`
}

export function menuGroupLabelModuleClasses(classMap: Record<string, string>): string {
  return classMap["pm-menu__group-label"] || ""
}

export function menuSeparatorClasses(): string {
  return `${BASE}__separator`
}

export function menuSeparatorModuleClasses(classMap: Record<string, string>): string {
  return classMap["pm-menu__separator"] || ""
}
