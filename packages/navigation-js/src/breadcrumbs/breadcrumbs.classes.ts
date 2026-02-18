import type {
  BreadcrumbsClassesOptions,
  BreadcrumbsItemClassesOptions,
  BreadcrumbsLinkClassesOptions,
} from "./breadcrumbs.types.js"

const BASE = "pm-breadcrumbs"

export function breadcrumbsClasses(options: BreadcrumbsClassesOptions = {}): string {
  const { separator = "slash" } = options
  const classes = [BASE, `${BASE}--${separator}`]
  return classes.join(" ")
}

export function breadcrumbsModuleClasses(
  classMap: Record<string, string>,
  options: BreadcrumbsClassesOptions = {},
): string {
  const { separator = "slash" } = options
  const classes = [classMap[BASE], classMap[`${BASE}--${separator}`]]
  return classes.filter(Boolean).join(" ")
}

const ITEM_BASE = "pm-breadcrumbs__item"

export function breadcrumbsItemClasses(options: BreadcrumbsItemClassesOptions = {}): string {
  const { active = false } = options
  const classes = [ITEM_BASE]
  if (active) classes.push(`${ITEM_BASE}--active`)
  return classes.join(" ")
}

export function breadcrumbsItemModuleClasses(
  classMap: Record<string, string>,
  options: BreadcrumbsItemClassesOptions = {},
): string {
  const { active = false } = options
  const classes = [classMap[ITEM_BASE]]
  if (active) classes.push(classMap[`${ITEM_BASE}--active`])
  return classes.filter(Boolean).join(" ")
}

const LINK_BASE = "pm-breadcrumbs__link"

export function breadcrumbsLinkClasses(_options: BreadcrumbsLinkClassesOptions = {}): string {
  return LINK_BASE
}

export function breadcrumbsLinkModuleClasses(
  classMap: Record<string, string>,
  _options: BreadcrumbsLinkClassesOptions = {},
): string {
  return classMap[LINK_BASE] || ""
}
