export type DataGridSize = "sm" | "md"

export interface DataGridClassesOptions {
  size?: DataGridSize
  bordered?: boolean
  hoverable?: boolean
  stickyHeader?: boolean
  resizable?: boolean
}

export interface DataGridClassesResult {
  root: string
  row: string
  cell: string
  columnHeader: string
}
