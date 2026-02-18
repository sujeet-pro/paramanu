export type DataTableSize = "sm" | "md" | "lg"

export type DataTableVariant = "simple" | "striped"

export type DataTableSortDirection = "asc" | "desc" | "none"

export type DataTableCellAlign = "start" | "center" | "end"

export interface DataTableClassesOptions {
  variant?: DataTableVariant
  size?: DataTableSize
  hoverable?: boolean
  bordered?: boolean
  stickyHeader?: boolean
  selectable?: boolean
}

export interface DataTableHeaderCellClassesOptions {
  sortable?: boolean
  sortDirection?: DataTableSortDirection
  align?: DataTableCellAlign
}

export interface DataTableClassesResult {
  root: string
  table: string
  toolbar: string
  headerCell: string
  cell: string
  row: string
  pagination: string
}
