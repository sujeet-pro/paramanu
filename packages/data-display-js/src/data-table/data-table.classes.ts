import type {
  DataTableClassesOptions,
  DataTableClassesResult,
  DataTableHeaderCellClassesOptions,
} from "./data-table.types.js"

const BASE = "pm-data-table"

/**
 * Returns BEM class names for the DataTable component.
 *
 * DataTable is an enhanced table with support for sorting indicators,
 * a toolbar area, pagination, and row selection.
 *
 * @example
 * ```ts
 * const cls = dataTableClasses({ variant: "striped", selectable: true })
 * // cls.root    => "pm-data-table pm-data-table--striped pm-data-table--md pm-data-table--selectable"
 * // cls.toolbar => "pm-data-table__toolbar"
 * ```
 */
export function dataTableClasses(options: DataTableClassesOptions = {}): DataTableClassesResult {
  const {
    variant = "simple",
    size = "md",
    hoverable = false,
    bordered = false,
    stickyHeader = false,
    selectable = false,
  } = options

  const rootClasses = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`]
  if (hoverable) rootClasses.push(`${BASE}--hoverable`)
  if (bordered) rootClasses.push(`${BASE}--bordered`)
  if (stickyHeader) rootClasses.push(`${BASE}--sticky-header`)
  if (selectable) rootClasses.push(`${BASE}--selectable`)

  return {
    root: rootClasses.join(" "),
    table: `${BASE}__table`,
    toolbar: `${BASE}__toolbar`,
    headerCell: `${BASE}__header-cell`,
    cell: `${BASE}__cell`,
    row: `${BASE}__row`,
    pagination: `${BASE}__pagination`,
  }
}

/**
 * Returns BEM class names for a DataTable header cell with sort / align modifiers.
 *
 * @example
 * ```ts
 * dataTableHeaderCellClasses({ sortable: true, sortDirection: "asc" })
 * // => "pm-data-table__header-cell pm-data-table__header-cell--sortable pm-data-table__header-cell--sort-asc"
 * ```
 */
export function dataTableHeaderCellClasses(
  options: DataTableHeaderCellClassesOptions = {},
): string {
  const { sortable = false, sortDirection = "none", align = "start" } = options
  const classes = [`${BASE}__header-cell`]
  if (sortable) classes.push(`${BASE}__header-cell--sortable`)
  if (sortDirection !== "none") classes.push(`${BASE}__header-cell--sort-${sortDirection}`)
  if (align !== "start") classes.push(`${BASE}__header-cell--align-${align}`)
  return classes.join(" ")
}

/**
 * Returns CSS module class names for the DataTable component.
 * Used by bundled consumers who import CSS modules.
 */
export function dataTableModuleClasses(
  classMap: Record<string, string>,
  options: DataTableClassesOptions = {},
): DataTableClassesResult {
  const {
    variant = "simple",
    size = "md",
    hoverable = false,
    bordered = false,
    stickyHeader = false,
    selectable = false,
  } = options

  const rootClasses = [classMap[BASE], classMap[`${BASE}--${variant}`], classMap[`${BASE}--${size}`]]
  if (hoverable) rootClasses.push(classMap[`${BASE}--hoverable`])
  if (bordered) rootClasses.push(classMap[`${BASE}--bordered`])
  if (stickyHeader) rootClasses.push(classMap[`${BASE}--sticky-header`])
  if (selectable) rootClasses.push(classMap[`${BASE}--selectable`])

  return {
    root: rootClasses.filter(Boolean).join(" "),
    table: classMap[`${BASE}__table`] || "",
    toolbar: classMap[`${BASE}__toolbar`] || "",
    headerCell: classMap[`${BASE}__header-cell`] || "",
    cell: classMap[`${BASE}__cell`] || "",
    row: classMap[`${BASE}__row`] || "",
    pagination: classMap[`${BASE}__pagination`] || "",
  }
}
