import type {
  PaginationClassesOptions,
  PaginationItemClassesOptions,
} from "./pagination.types.js"

const BASE = "pm-pagination"

export function paginationClasses(options: PaginationClassesOptions = {}): string {
  const { size = "md", variant = "default" } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`]
  return classes.join(" ")
}

export function paginationModuleClasses(
  classMap: Record<string, string>,
  options: PaginationClassesOptions = {},
): string {
  const { size = "md", variant = "default" } = options
  const classes = [classMap[BASE], classMap[`${BASE}--${variant}`], classMap[`${BASE}--${size}`]]
  return classes.filter(Boolean).join(" ")
}

const ITEM_BASE = "pm-pagination__item"

export function paginationItemClasses(options: PaginationItemClassesOptions = {}): string {
  const { type = "page", active = false, disabled = false } = options
  const classes = [ITEM_BASE, `${ITEM_BASE}--${type}`]
  if (active) classes.push(`${ITEM_BASE}--active`)
  if (disabled) classes.push(`${ITEM_BASE}--disabled`)
  return classes.join(" ")
}

export function paginationItemModuleClasses(
  classMap: Record<string, string>,
  options: PaginationItemClassesOptions = {},
): string {
  const { type = "page", active = false, disabled = false } = options
  const classes = [classMap[ITEM_BASE], classMap[`${ITEM_BASE}--${type}`]]
  if (active) classes.push(classMap[`${ITEM_BASE}--active`])
  if (disabled) classes.push(classMap[`${ITEM_BASE}--disabled`])
  return classes.filter(Boolean).join(" ")
}
