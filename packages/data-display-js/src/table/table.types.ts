/** Visual style variant for the table. */
export type TableVariant = "simple" | "striped"

/** Controls cell padding and font size. */
export type TableSize = "sm" | "md" | "lg"

/** Controls how the table calculates column widths. */
export type TableLayout = "auto" | "fixed"

/** Options for generating table CSS class names. */
export interface TableClassesOptions {
  /** Visual style variant. @default "simple" */
  variant?: TableVariant
  /** Controls cell padding and font size. @default "md" */
  size?: TableSize
  /** Column width algorithm. `fixed` distributes columns evenly. @default "auto" */
  layout?: TableLayout
  /** Highlights rows on hover. @default false */
  hoverable?: boolean
  /** Adds borders around cells and the table. @default false */
  bordered?: boolean
  /** Makes the header row stick to the top on scroll. @default false */
  stickyHeader?: boolean
}

/**
 * Object containing BEM class names for each table sub-element.
 * Apply these classes to the corresponding HTML table elements.
 */
export interface TableClassesResult {
  /** Scrollable wrapper `<div>` around the table. */
  container: string
  /** The `<table>` element itself. */
  root: string
  /** The `<caption>` element. */
  caption: string
  /** The `<thead>` element. */
  head: string
  /** The `<tbody>` element. */
  body: string
  /** The `<tfoot>` element. */
  foot: string
  /** Each `<tr>` element. */
  row: string
  /** Each `<th>` element. */
  headerCell: string
  /** Each `<td>` element. */
  cell: string
}

/** CSS module class name result (same shape as BEM result). */
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

/** Props for the Table component. */
export interface TableProps extends TableClassesOptions {}
