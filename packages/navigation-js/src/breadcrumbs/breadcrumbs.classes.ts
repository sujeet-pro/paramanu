import type {
  BreadcrumbClassesOptions,
  BreadcrumbItemClassesOptions,
  BreadcrumbLinkClassesOptions,
} from "./breadcrumbs.types.js"

const BASE = "pm-breadcrumb"

export function breadcrumbClasses(options: BreadcrumbClassesOptions = {}): string {
  const { separator = "slash" } = options
  const classes = [BASE, `${BASE}--${separator}`]
  return classes.join(" ")
}

export function breadcrumbModuleClasses(
  classMap: Record<string, string>,
  options: BreadcrumbClassesOptions = {},
): string {
  const { separator = "slash" } = options
  const classes = [classMap[BASE], classMap[`${BASE}--${separator}`]]
  return classes.filter(Boolean).join(" ")
}

const ITEM_BASE = "pm-breadcrumb__item"

export function breadcrumbItemClasses(options: BreadcrumbItemClassesOptions = {}): string {
  const { active = false } = options
  const classes = [ITEM_BASE]
  if (active) classes.push(`${ITEM_BASE}--active`)
  return classes.join(" ")
}

export function breadcrumbItemModuleClasses(
  classMap: Record<string, string>,
  options: BreadcrumbItemClassesOptions = {},
): string {
  const { active = false } = options
  const classes = [classMap[ITEM_BASE]]
  if (active) classes.push(classMap[`${ITEM_BASE}--active`])
  return classes.filter(Boolean).join(" ")
}

const LINK_BASE = "pm-breadcrumb__link"

export function breadcrumbsLinkClasses(_options: BreadcrumbLinkClassesOptions = {}): string {
  return LINK_BASE
}

export function breadcrumbsLinkModuleClasses(
  classMap: Record<string, string>,
  _options: BreadcrumbLinkClassesOptions = {},
): string {
  return classMap[LINK_BASE] || ""
}
