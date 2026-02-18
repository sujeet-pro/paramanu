import type { DataGridClassesOptions, DataGridClassesResult } from "./data-grid.types.js"

const BASE = "pm-data-grid"

export function dataGridClasses(options: DataGridClassesOptions = {}): DataGridClassesResult {
  const {
    size = "md",
    bordered = false,
    hoverable = false,
    stickyHeader = false,
    resizable = false,
  } = options

  const rootClasses = [BASE, `${BASE}--${size}`]
  if (bordered) rootClasses.push(`${BASE}--bordered`)
  if (hoverable) rootClasses.push(`${BASE}--hoverable`)
  if (stickyHeader) rootClasses.push(`${BASE}--sticky-header`)
  if (resizable) rootClasses.push(`${BASE}--resizable`)

  return {
    root: rootClasses.join(" "),
    row: `${BASE}__row`,
    cell: `${BASE}__cell`,
    columnHeader: `${BASE}__column-header`,
  }
}

export function dataGridModuleClasses(
  classMap: Record<string, string>,
  options: DataGridClassesOptions = {},
): DataGridClassesResult {
  const {
    size = "md",
    bordered = false,
    hoverable = false,
    stickyHeader = false,
    resizable = false,
  } = options

  const rootClasses = [classMap[BASE], classMap[`${BASE}--${size}`]]
  if (bordered) rootClasses.push(classMap[`${BASE}--bordered`])
  if (hoverable) rootClasses.push(classMap[`${BASE}--hoverable`])
  if (stickyHeader) rootClasses.push(classMap[`${BASE}--sticky-header`])
  if (resizable) rootClasses.push(classMap[`${BASE}--resizable`])

  return {
    root: rootClasses.filter(Boolean).join(" "),
    row: classMap[`${BASE}__row`] || "",
    cell: classMap[`${BASE}__cell`] || "",
    columnHeader: classMap[`${BASE}__column-header`] || "",
  }
}
