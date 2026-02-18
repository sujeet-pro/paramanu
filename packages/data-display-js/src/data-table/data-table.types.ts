/** Controls cell padding and font size of the data table. */
export type DataTableSize = "sm" | "md" | "lg"

/** Visual style variant for the data table. */
export type DataTableVariant = "simple" | "striped"

/** Sort direction for a column header. */
export type DataTableSortDirection = "asc" | "desc" | "none"

/** Text alignment for a cell. */
export type DataTableCellAlign = "start" | "center" | "end"

/** Options for generating data table CSS class names. */
export interface DataTableClassesOptions {
  /** Visual style variant. @default "simple" */
  variant?: DataTableVariant
  /** Controls cell padding and font size. @default "md" */
  size?: DataTableSize
  /** Highlights rows on hover. @default false */
  hoverable?: boolean
  /** Adds borders around cells and the table. @default false */
  bordered?: boolean
  /** Makes the header row stick to the top on scroll. @default false */
  stickyHeader?: boolean
  /** Enables row selection with pointer cursor and highlight. @default false */
  selectable?: boolean
}

/** Options for generating data table header cell class names. */
export interface DataTableHeaderCellClassesOptions {
  /** Whether the column is sortable. @default false */
  sortable?: boolean
  /** Current sort direction. @default "none" */
  sortDirection?: DataTableSortDirection
  /** Text alignment override. @default "start" */
  align?: DataTableCellAlign
}

/**
 * Object containing BEM class names for each data table sub-element.
 */
export interface DataTableClassesResult {
  /** Outermost wrapper `<div>`. */
  root: string
  /** The `<table>` element. */
  table: string
  /** Toolbar area for search, filters, actions. */
  toolbar: string
  /** Each `<th>` header cell. */
  headerCell: string
  /** Each `<td>` body cell. */
  cell: string
  /** Each `<tr>` row. */
  row: string
  /** Pagination controls wrapper. */
  pagination: string
}

/** Props for the DataTable component. */
export interface DataTableProps extends DataTableClassesOptions {}
