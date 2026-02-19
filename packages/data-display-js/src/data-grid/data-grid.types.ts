/** Controls cell padding and font size of the data grid. */
export type DatagridSize = "sm" | "md"

/** Options for generating data grid CSS class names. */
export interface DatagridClassesOptions {
  /** Controls cell padding and font size. @default "md" */
  size?: DatagridSize
  /** Adds borders around cells and the grid. @default false */
  bordered?: boolean
  /** Highlights rows on hover. @default false */
  hoverable?: boolean
  /** Makes the column header row stick to the top on scroll. @default false */
  stickyHeader?: boolean
  /** Enables column resize handles on headers. @default false */
  resizable?: boolean
}

/**
 * Object containing BEM class names for each data grid sub-element.
 * The grid uses CSS Grid with `display: contents` rows for virtualization support.
 */
export interface DatagridClassesResult {
  /** Outermost grid container `<div role="grid">`. */
  root: string
  /** Each row `<div role="row">` with `display: contents`. */
  row: string
  /** Each body cell `<div role="gridcell">`. */
  cell: string
  /** Each column header `<div role="columnheader">`. */
  columnHeader: string
}

/** Props for the Datagrid component. */
export interface DatagridProps extends DatagridClassesOptions {}
