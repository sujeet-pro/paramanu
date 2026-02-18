import type { SidebarClassesOptions, SidebarItemClassesOptions } from "./sidebar.types.js"

const BASE = "pm-sidebar"

export function sidebarClasses(options: SidebarClassesOptions = {}): string {
  const { width = "default", collapsed = false, position = "left" } = options
  const classes = [BASE, `${BASE}--${width}`, `${BASE}--${position}`]
  if (collapsed) classes.push(`${BASE}--collapsed`)
  return classes.join(" ")
}

export function sidebarModuleClasses(
  classMap: Record<string, string>,
  options: SidebarClassesOptions = {},
): string {
  const { width = "default", collapsed = false, position = "left" } = options
  const classes = [classMap[BASE], classMap[`${BASE}--${width}`], classMap[`${BASE}--${position}`]]
  if (collapsed) classes.push(classMap[`${BASE}--collapsed`])
  return classes.filter(Boolean).join(" ")
}

const SECTION_BASE = "pm-sidebar__section"

export function sidebarSectionClasses(): string {
  return SECTION_BASE
}

export function sidebarSectionModuleClasses(classMap: Record<string, string>): string {
  return classMap[SECTION_BASE] || ""
}

const SECTION_LABEL_BASE = "pm-sidebar__section-label"

export function sidebarSectionLabelClasses(): string {
  return SECTION_LABEL_BASE
}

export function sidebarSectionLabelModuleClasses(classMap: Record<string, string>): string {
  return classMap[SECTION_LABEL_BASE] || ""
}

const ITEM_BASE = "pm-sidebar__item"

export function sidebarItemClasses(options: SidebarItemClassesOptions = {}): string {
  const { active = false, disabled = false, indent = 0 } = options
  const classes = [ITEM_BASE]
  if (active) classes.push(`${ITEM_BASE}--active`)
  if (disabled) classes.push(`${ITEM_BASE}--disabled`)
  if (indent > 0) classes.push(`${ITEM_BASE}--indent-${indent}`)
  return classes.join(" ")
}

export function sidebarItemModuleClasses(
  classMap: Record<string, string>,
  options: SidebarItemClassesOptions = {},
): string {
  const { active = false, disabled = false, indent = 0 } = options
  const classes = [classMap[ITEM_BASE]]
  if (active) classes.push(classMap[`${ITEM_BASE}--active`])
  if (disabled) classes.push(classMap[`${ITEM_BASE}--disabled`])
  if (indent > 0) classes.push(classMap[`${ITEM_BASE}--indent-${indent}`])
  return classes.filter(Boolean).join(" ")
}
