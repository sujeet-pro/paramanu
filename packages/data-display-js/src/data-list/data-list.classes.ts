import type {
  DatalistClassesOptions,
  DatalistClassesResult,
  DatalistModuleClassesResult,
} from "./data-list.types.js"

const BASE = "pm-datalist"

/**
 * Returns BEM class names for the Datalist (description list) component.
 *
 * Renders a semantic `<dl>` with `<dt>` / `<dd>` pairs. Supports
 * vertical (stacked) and horizontal (side-by-side) orientations.
 *
 * @example
 * ```ts
 * const cls = datalistClasses({ orientation: "horizontal", dividers: true })
 * // cls.root   => "pm-datalist pm-datalist--horizontal pm-datalist--md pm-datalist--dividers"
 * // cls.term   => "pm-datalist__term"
 * // cls.detail => "pm-datalist__detail"
 * ```
 */
export function datalistClasses(options: DatalistClassesOptions = {}): DatalistClassesResult {
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
 * Returns CSS module class names for the Datalist component.
 * Used by bundled consumers who import CSS modules.
 */
export function datalistModuleClasses(
  classMap: Record<string, string>,
  options: DatalistClassesOptions = {},
): DatalistModuleClassesResult {
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
