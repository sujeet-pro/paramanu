export type PaginationSize = "sm" | "md" | "lg"

export type PaginationVariant = "default" | "minimal"

export type PaginationItemType = "page" | "prev" | "next" | "ellipsis"

export interface PaginationClassesOptions {
  size?: PaginationSize
  variant?: PaginationVariant
}

export interface PaginationItemClassesOptions {
  type?: PaginationItemType
  active?: boolean
  disabled?: boolean
}
