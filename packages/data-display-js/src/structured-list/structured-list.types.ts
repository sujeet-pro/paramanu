export type StructuredListSize = "sm" | "md"

export interface StructuredListClassesOptions {
  size?: StructuredListSize
  selectable?: boolean
  bordered?: boolean
}

export interface StructuredListClassesResult {
  root: string
  head: string
  body: string
  row: string
  cell: string
  headerCell: string
}

export interface StructuredListModuleClassesResult {
  root: string
  head: string
  body: string
  row: string
  cell: string
  headerCell: string
}

export interface StructuredListProps extends StructuredListClassesOptions {}
