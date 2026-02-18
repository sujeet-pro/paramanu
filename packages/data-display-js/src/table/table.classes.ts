import type {
  TableClassesOptions,
  TableClassesResult,
  TableModuleClassesResult,
} from "./table.types.js"

const BASE = "pm-table"

/**
 * Returns BEM class names for the table component (human-readable).
 * Used by CDN and template consumers.
 */
export function tableClasses(options: TableClassesOptions = {}): TableClassesResult {
  const {
    variant = "simple",
    size = "md",
    layout = "auto",
    hoverable = false,
    bordered = false,
    stickyHeader = false,
  } = options

  const rootClasses = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`, `${BASE}--layout-${layout}`]

  if (hoverable) rootClasses.push(`${BASE}--hoverable`)
  if (bordered) rootClasses.push(`${BASE}--bordered`)
  if (stickyHeader) rootClasses.push(`${BASE}--sticky-header`)

  return {
    container: `${BASE}__container`,
    root: rootClasses.join(" "),
    caption: `${BASE}__caption`,
    head: `${BASE}__head`,
    body: `${BASE}__body`,
    foot: `${BASE}__foot`,
    row: `${BASE}__row`,
    headerCell: `${BASE}__header-cell`,
    cell: `${BASE}__cell`,
  }
}

/**
 * Returns CSS module class names for the table component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function tableModuleClasses(
  classMap: Record<string, string>,
  options: TableClassesOptions = {},
): TableModuleClassesResult {
  const {
    variant = "simple",
    size = "md",
    layout = "auto",
    hoverable = false,
    bordered = false,
    stickyHeader = false,
  } = options

  const rootClasses = [
    classMap[BASE],
    classMap[`${BASE}--${variant}`],
    classMap[`${BASE}--${size}`],
    classMap[`${BASE}--layout-${layout}`],
  ]

  if (hoverable) rootClasses.push(classMap[`${BASE}--hoverable`])
  if (bordered) rootClasses.push(classMap[`${BASE}--bordered`])
  if (stickyHeader) rootClasses.push(classMap[`${BASE}--sticky-header`])

  return {
    container: classMap[`${BASE}__container`] ?? "",
    root: rootClasses.filter(Boolean).join(" "),
    caption: classMap[`${BASE}__caption`] ?? "",
    head: classMap[`${BASE}__head`] ?? "",
    body: classMap[`${BASE}__body`] ?? "",
    foot: classMap[`${BASE}__foot`] ?? "",
    row: classMap[`${BASE}__row`] ?? "",
    headerCell: classMap[`${BASE}__header-cell`] ?? "",
    cell: classMap[`${BASE}__cell`] ?? "",
  }
}
