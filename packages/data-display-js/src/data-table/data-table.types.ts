/** Controls cell padding and font size of the data table. */
export type DatatableSize = "sm" | "md" | "lg"

/** Visual style variant for the data table. */
export type DatatableVariant = "simple" | "striped"

/** Sort direction for a column header. */
export type DatatableSortDirection = "asc" | "desc" | "none"

/** Text alignment for a cell. */
export type DatatableCellAlign = "start" | "center" | "end"

/** Options for generating data table CSS class names. */
export interface DatatableClassesOptions {
  /** Visual style variant. @default "simple" */
  variant?: DatatableVariant
  /** Controls cell padding and font size. @default "md" */
  size?: DatatableSize
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
export interface DatatableHeaderCellClassesOptions {
  /** Whether the column is sortable. @default false */
  sortable?: boolean
  /** Current sort direction. @default "none" */
  sortDirection?: DatatableSortDirection
  /** Text alignment override. @default "start" */
  align?: DatatableCellAlign
}

/**
 * Object containing BEM class names for each data table sub-element.
 */
export interface DatatableClassesResult {
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

/** Props for the Datatable component. */
export interface DatatableProps extends DatatableClassesOptions {}
