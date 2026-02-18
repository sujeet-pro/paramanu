import type {
  DataListClassesOptions,
  DataListClassesResult,
  DataListModuleClassesResult,
} from "./data-list.types.js"

const BASE = "pm-data-list"

/**
 * Returns BEM class names for the DataList (description list) component.
 *
 * Renders a semantic `<dl>` with `<dt>` / `<dd>` pairs. Supports
 * vertical (stacked) and horizontal (side-by-side) orientations.
 *
 * @example
 * ```ts
 * const cls = dataListClasses({ orientation: "horizontal", dividers: true })
 * // cls.root   => "pm-data-list pm-data-list--horizontal pm-data-list--md pm-data-list--dividers"
 * // cls.term   => "pm-data-list__term"
 * // cls.detail => "pm-data-list__detail"
 * ```
 */
export function dataListClasses(options: DataListClassesOptions = {}): DataListClassesResult {
  const { orientation = "vertical", size = "md", dividers = false } = options

  const rootClasses = [BASE, `${BASE}--${orientation}`, `${BASE}--${size}`]

  if (dividers) rootClasses.push(`${BASE}--dividers`)

  return {
    root: rootClasses.join(" "),
    item: `${BASE}__item`,
    term: `${BASE}__term`,
    detail: `${BASE}__detail`,
  }
}

/**
 * Returns CSS module class names for the DataList component.
 * Used by bundled consumers who import CSS modules.
 */
export function dataListModuleClasses(
  classMap: Record<string, string>,
  options: DataListClassesOptions = {},
): DataListModuleClassesResult {
  const { orientation = "vertical", size = "md", dividers = false } = options

  const rootClasses = [
    classMap[BASE],
    classMap[`${BASE}--${orientation}`],
    classMap[`${BASE}--${size}`],
  ]

  if (dividers) rootClasses.push(classMap[`${BASE}--dividers`])

  return {
    root: rootClasses.filter(Boolean).join(" "),
    item: classMap[`${BASE}__item`] ?? "",
    term: classMap[`${BASE}__term`] ?? "",
    detail: classMap[`${BASE}__detail`] ?? "",
  }
}
