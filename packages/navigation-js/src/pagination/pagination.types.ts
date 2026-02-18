/** Size preset for pagination items */
export type PaginationSize = "sm" | "md" | "lg"

/** Visual style variant for pagination */
export type PaginationVariant = "default" | "minimal"

/** Type of pagination item */
export type PaginationItemType = "page" | "prev" | "next" | "ellipsis"

/**
 * Options for generating pagination container CSS class names.
 * Used by both BEM (`paginationClasses`) and CSS module (`paginationModuleClasses`) builders.
 */
export interface PaginationClassesOptions {
  /** Size preset controlling item dimensions and font-size. @default "md" */
  size?: PaginationSize
  /** Visual style variant. @default "default" */
  variant?: PaginationVariant
}

/**
 * Options for generating individual pagination item CSS class names.
 */
export interface PaginationItemClassesOptions {
  /** The type of pagination item. @default "page" */
  type?: PaginationItemType
  /** Whether this item represents the current page. @default false */
  active?: boolean
  /** Whether this item is in a disabled, non-interactive state. @default false */
  disabled?: boolean
}
