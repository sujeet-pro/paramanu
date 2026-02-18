/** Controls cell padding and font size. */
export type StructuredListSize = "sm" | "md"

/** Options for generating structured list CSS class names. */
export interface StructuredListClassesOptions {
  /** Controls cell padding and font size. @default "md" */
  size?: StructuredListSize
  /** Enables row selection with hover/focus states. @default false */
  selectable?: boolean
  /** Adds borders around cells and the list. @default false */
  bordered?: boolean
}

/**
 * Object containing BEM class names for each structured list sub-element.
 * Uses `display: table` for column alignment without a real `<table>` element.
 */
export interface StructuredListClassesResult {
  /** Outermost `<div role="table">` wrapper. */
  root: string
  /** Header group `<div>` (table-header-group). */
  head: string
  /** Body group `<div>` (table-row-group). */
  body: string
  /** Each row `<div role="row">`. */
  row: string
  /** Each body cell `<div role="cell">`. */
  cell: string
  /** Each header cell `<div role="columnheader">`. */
  headerCell: string
}

/** CSS module result (same shape). */
export interface StructuredListModuleClassesResult {
  root: string
  head: string
  body: string
  row: string
  cell: string
  headerCell: string
}

/** Props for the StructuredList component. */
export interface StructuredListProps extends StructuredListClassesOptions {}
