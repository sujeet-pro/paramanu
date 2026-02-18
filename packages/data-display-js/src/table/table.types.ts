export type TableVariant = "simple" | "striped"

export type TableSize = "sm" | "md" | "lg"

export type TableLayout = "auto" | "fixed"

export interface TableClassesOptions {
  variant?: TableVariant
  size?: TableSize
  layout?: TableLayout
  hoverable?: boolean
  bordered?: boolean
  stickyHeader?: boolean
}

export interface TableClassesResult {
  container: string
  root: string
  caption: string
  head: string
  body: string
  foot: string
  row: string
  headerCell: string
  cell: string
}

export interface TableModuleClassesResult {
  container: string
  root: string
  caption: string
  head: string
  body: string
  foot: string
  row: string
  headerCell: string
  cell: string
}

export interface TableProps extends TableClassesOptions {}
