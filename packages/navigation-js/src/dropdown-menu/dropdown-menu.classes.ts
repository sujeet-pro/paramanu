import type { DropdownMenuClassesOptions } from "./dropdown-menu.types.js"

const BASE = "pm-dropdown-menu"

export function dropdownMenuClasses(options: DropdownMenuClassesOptions = {}): string {
  const { size = "md", open = false } = options
  const classes = [BASE, `${BASE}--${size}`]
  if (open) classes.push(`${BASE}--open`)
  return classes.join(" ")
}

export function dropdownMenuModuleClasses(
  classMap: Record<string, string>,
  options: DropdownMenuClassesOptions = {},
): string {
  const { size = "md", open = false } = options
  const classes = [classMap["pm-dropdown-menu"], classMap[`pm-dropdown-menu--${size}`]]
  if (open) classes.push(classMap["pm-dropdown-menu--open"])
  return classes.filter(Boolean).join(" ")
}

export function dropdownMenuTriggerClasses(): string {
  return `${BASE}__trigger`
}

export function dropdownMenuTriggerModuleClasses(classMap: Record<string, string>): string {
  return classMap["pm-dropdown-menu__trigger"] || ""
}

export function dropdownMenuContentClasses(): string {
  return `${BASE}__content`
}

export function dropdownMenuContentModuleClasses(classMap: Record<string, string>): string {
  return classMap["pm-dropdown-menu__content"] || ""
}
