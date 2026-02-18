import type {
  StructuredListClassesOptions,
  StructuredListClassesResult,
  StructuredListModuleClassesResult,
} from "./structured-list.types.js"

const BASE = "pm-structured-list"

/**
 * Returns BEM class names for the structured list component (human-readable).
 * Used by CDN and template consumers.
 */
export function structuredListClasses(
  options: StructuredListClassesOptions = {},
): StructuredListClassesResult {
  const { size = "md", selectable = false, bordered = false } = options

  const rootClasses = [BASE, `${BASE}--${size}`]

  if (selectable) rootClasses.push(`${BASE}--selectable`)
  if (bordered) rootClasses.push(`${BASE}--bordered`)

  return {
    root: rootClasses.join(" "),
    head: `${BASE}__head`,
    body: `${BASE}__body`,
    row: `${BASE}__row`,
    cell: `${BASE}__cell`,
    headerCell: `${BASE}__header-cell`,
  }
}

/**
 * Returns CSS module class names for the structured list component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function structuredListModuleClasses(
  classMap: Record<string, string>,
  options: StructuredListClassesOptions = {},
): StructuredListModuleClassesResult {
  const { size = "md", selectable = false, bordered = false } = options

  const rootClasses = [classMap[BASE], classMap[`${BASE}--${size}`]]

  if (selectable) rootClasses.push(classMap[`${BASE}--selectable`])
  if (bordered) rootClasses.push(classMap[`${BASE}--bordered`])

  return {
    root: rootClasses.filter(Boolean).join(" "),
    head: classMap[`${BASE}__head`] ?? "",
    body: classMap[`${BASE}__body`] ?? "",
    row: classMap[`${BASE}__row`] ?? "",
    cell: classMap[`${BASE}__cell`] ?? "",
    headerCell: classMap[`${BASE}__header-cell`] ?? "",
  }
}
