import type {
  EmptyClassesOptions,
  EmptyClassesResult,
  EmptyModuleClassesResult,
} from "./empty-state.types.js"

const BASE = "pm-empty"

/**
 * Returns BEM class names for the Empty component.
 *
 * Empty is a centered placeholder displayed when a view or list
 * has no data. It contains an icon, heading, description, and action buttons.
 *
 * @example
 * ```ts
 * const cls = emptyClasses({ size: "lg", bordered: true })
 * // cls.root        => "pm-empty pm-empty--lg pm-empty--bordered"
 * // cls.heading     => "pm-empty__heading"
 * // cls.description => "pm-empty__description"
 * ```
 */
export function emptyClasses(options: EmptyClassesOptions = {}): EmptyClassesResult {
  const { size = "md", bordered = false } = options

  const rootClasses = [BASE, `${BASE}--${size}`]

  if (bordered) rootClasses.push(`${BASE}--bordered`)

  return {
    root: rootClasses.join(" "),
    icon: `${BASE}__icon`,
    heading: `${BASE}__heading`,
    description: `${BASE}__description`,
    actions: `${BASE}__actions`,
  }
}

/**
 * Returns CSS module class names for the Empty component.
 * Used by bundled consumers who import CSS modules.
 */
export function emptyModuleClasses(
  classMap: Record<string, string>,
  options: EmptyClassesOptions = {},
): EmptyModuleClassesResult {
  const { size = "md", bordered = false } = options

  const rootClasses = [classMap[BASE], classMap[`${BASE}--${size}`]]

  if (bordered) rootClasses.push(classMap[`${BASE}--bordered`])

  return {
    root: rootClasses.filter(Boolean).join(" "),
    icon: classMap[`${BASE}__icon`] ?? "",
    heading: classMap[`${BASE}__heading`] ?? "",
    description: classMap[`${BASE}__description`] ?? "",
    actions: classMap[`${BASE}__actions`] ?? "",
  }
}
