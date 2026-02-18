import type {
  StructuredListClassesOptions,
  StructuredListClassesResult,
  StructuredListModuleClassesResult,
} from "./structured-list.types.js"

const BASE = "pm-structured-list"

/**
 * Returns BEM class names for the StructuredList component.
 *
 * A read-only, column-aligned list rendered with CSS `display: table`.
 * Ideal for key-value data that needs column alignment without the
 * overhead of a full data table.
 *
 * @example
 * ```ts
 * const cls = structuredListClasses({ selectable: true, bordered: true })
 * // cls.root       => "pm-structured-list pm-structured-list--md pm-structured-list--selectable pm-structured-list--bordered"
 * // cls.headerCell => "pm-structured-list__header-cell"
 * ```
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
 * Returns CSS module class names for the StructuredList component.
 * Used by bundled consumers who import CSS modules.
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
