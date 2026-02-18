import type {
  EmptyStateClassesOptions,
  EmptyStateClassesResult,
  EmptyStateModuleClassesResult,
} from "./empty-state.types.js"

const BASE = "pm-empty-state"

/**
 * Returns BEM class names for the empty state component (human-readable).
 * Used by CDN and template consumers.
 */
export function emptyStateClasses(options: EmptyStateClassesOptions = {}): EmptyStateClassesResult {
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
 * Returns CSS module class names for the empty state component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function emptyStateModuleClasses(
  classMap: Record<string, string>,
  options: EmptyStateClassesOptions = {},
): EmptyStateModuleClassesResult {
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
