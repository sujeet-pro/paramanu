import type { MenubarItemClassesOptions } from "./menubar.types.js"

const BASE = "pm-menubar"

export function menubarClasses(): string {
  return BASE
}

export function menubarModuleClasses(classMap: Record<string, string>): string {
  return classMap["pm-menubar"] || ""
}

export function menubarItemClasses(options: MenubarItemClassesOptions = {}): string {
  const { active = false, disabled = false } = options
  const classes = [`${BASE}__item`]
  if (active) classes.push(`${BASE}__item--active`)
  if (disabled) classes.push(`${BASE}__item--disabled`)
  return classes.join(" ")
}

export function menubarItemModuleClasses(
  classMap: Record<string, string>,
  options: MenubarItemClassesOptions = {},
): string {
  const { active = false, disabled = false } = options
  const classes = [classMap["pm-menubar__item"]]
  if (active) classes.push(classMap["pm-menubar__item--active"])
  if (disabled) classes.push(classMap["pm-menubar__item--disabled"])
  return classes.filter(Boolean).join(" ")
}
