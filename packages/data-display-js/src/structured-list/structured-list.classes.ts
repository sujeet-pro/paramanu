import type {
  StructListClassesOptions,
  StructListClassesResult,
  StructListModuleClassesResult,
} from "./structured-list.types.js"

const BASE = "pm-struct-list"

/**
 * Returns BEM class names for the StructList component.
 *
 * A read-only, column-aligned list rendered with CSS `display: table`.
 * Ideal for key-value data that needs column alignment without the
 * overhead of a full data table.
 *
 * @example
 * ```ts
 * const cls = structListClasses({ selectable: true, bordered: true })
 * // cls.root       => "pm-struct-list pm-struct-list--md pm-struct-list--selectable pm-struct-list--bordered"
 * // cls.headerCell => "pm-struct-list__header-cell"
 * ```
 */
export function structListClasses(options: StructListClassesOptions = {}): StructListClassesResult {
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
 * Returns CSS module class names for the StructList component.
 * Used by bundled consumers who import CSS modules.
 */
export function structListModuleClasses(
  classMap: Record<string, string>,
  options: StructListClassesOptions = {},
): StructListModuleClassesResult {
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
