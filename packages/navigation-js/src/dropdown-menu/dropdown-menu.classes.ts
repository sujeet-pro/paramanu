import type { DropdownClassesOptions } from "./dropdown-menu.types.js"

const BASE = "pm-dropdown"

export function dropdownClasses(options: DropdownClassesOptions = {}): string {
  const { size = "md", open = false } = options
  const classes = [BASE, `${BASE}--${size}`]
  if (open) classes.push(`${BASE}--open`)
  return classes.join(" ")
}

export function dropdownModuleClasses(
  classMap: Record<string, string>,
  options: DropdownClassesOptions = {},
): string {
  const { size = "md", open = false } = options
  const classes = [classMap["pm-dropdown"], classMap[`pm-dropdown--${size}`]]
  if (open) classes.push(classMap["pm-dropdown--open"])
  return classes.filter(Boolean).join(" ")
}

export function dropdownMenuTriggerClasses(): string {
  return `${BASE}__trigger`
}

export function dropdownMenuTriggerModuleClasses(classMap: Record<string, string>): string {
  return classMap["pm-dropdown__trigger"] || ""
}

export function dropdownMenuContentClasses(): string {
  return `${BASE}__content`
}

export function dropdownMenuContentModuleClasses(classMap: Record<string, string>): string {
  return classMap["pm-dropdown__content"] || ""
}
