/** Separator character style between breadcrumb items */
export type BreadcrumbSeparator = "slash" | "chevron" | "dot" | "arrow"

/**
 * Options for generating breadcrumbs container CSS class names.
 * Used by both BEM (`breadcrumbClasses`) and CSS module (`breadcrumbModuleClasses`) builders.
 */
export interface BreadcrumbClassesOptions {
  /** Separator style between items. @default "slash" */
  separator?: BreadcrumbSeparator
}

/**
 * Options for generating breadcrumb item CSS class names.
 */
export interface BreadcrumbItemClassesOptions {
  /** Whether this is the currently active/last breadcrumb. @default false */
  active?: boolean
}

/**
 * Options for generating breadcrumb link CSS class names.
 */
export interface BreadcrumbLinkClassesOptions {}
