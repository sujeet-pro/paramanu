/** Separator character style between breadcrumb items */
export type BreadcrumbsSeparator = "slash" | "chevron" | "dot" | "arrow"

/**
 * Options for generating breadcrumbs container CSS class names.
 * Used by both BEM (`breadcrumbsClasses`) and CSS module (`breadcrumbsModuleClasses`) builders.
 */
export interface BreadcrumbsClassesOptions {
  /** Separator style between items. @default "slash" */
  separator?: BreadcrumbsSeparator
}

/**
 * Options for generating breadcrumb item CSS class names.
 */
export interface BreadcrumbsItemClassesOptions {
  /** Whether this is the currently active/last breadcrumb. @default false */
  active?: boolean
}

/**
 * Options for generating breadcrumb link CSS class names.
 */
export interface BreadcrumbsLinkClassesOptions {}
