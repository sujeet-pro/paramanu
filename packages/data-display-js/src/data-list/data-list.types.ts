export type DataListOrientation = "horizontal" | "vertical"

export type DataListSize = "sm" | "md" | "lg"

export interface DataListClassesOptions {
  orientation?: DataListOrientation
  size?: DataListSize
  dividers?: boolean
}

export interface DataListClassesResult {
  root: string
  item: string
  term: string
  detail: string
}

export interface DataListModuleClassesResult {
  root: string
  item: string
  term: string
  detail: string
}

export interface DataListProps extends DataListClassesOptions {}
