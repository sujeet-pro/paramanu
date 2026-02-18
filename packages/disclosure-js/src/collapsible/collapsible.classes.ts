import type {
  CollapsibleClassesOptions,
  CollapsibleTriggerClassesOptions,
  CollapsibleContentClassesOptions,
  CollapsibleIconClassesOptions,
} from "./collapsible.types.js"

const BASE = "pm-collapsible"

/**
 * Returns BEM class names for the collapsible root element.
 *
 * @example
 * ```ts
 * collapsibleClasses() // "pm-collapsible pm-collapsible--md"
 * collapsibleClasses({ open: true, size: "lg" })
 * // "pm-collapsible pm-collapsible--lg pm-collapsible--open"
 * ```
 */
export function collapsibleClasses(options: CollapsibleClassesOptions = {}): string {
  const { open = false, disabled = false, size = "md" } = options
  const classes = [BASE, `${BASE}--${size}`]

  if (open) classes.push(`${BASE}--open`)
  if (disabled) classes.push(`${BASE}--disabled`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the collapsible root element.
 *
 * @example
 * ```ts
 * import styles from "./collapsible.module.css"
 * collapsibleModuleClasses(styles, { open: true })
 * ```
 */
export function collapsibleModuleClasses(
  classMap: Record<string, string>,
  options: CollapsibleClassesOptions = {},
): string {
  const { open = false, disabled = false, size = "md" } = options

  const classes = [classMap[BASE], classMap[`${BASE}--${size}`]]

  if (open) classes.push(classMap[`${BASE}--open`])
  if (disabled) classes.push(classMap[`${BASE}--disabled`])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for a collapsible trigger button.
 *
 * @example
 * ```ts
 * collapsibleTriggerClasses({ open: true, size: "sm" })
 * // "pm-collapsible__trigger pm-collapsible__trigger--sm pm-collapsible__trigger--open"
 * ```
 */
export function collapsibleTriggerClasses(options: CollapsibleTriggerClassesOptions = {}): string {
  const { open = false, disabled = false, size = "md" } = options
  const classes = [`${BASE}__trigger`, `${BASE}__trigger--${size}`]

  if (open) classes.push(`${BASE}__trigger--open`)
  if (disabled) classes.push(`${BASE}__trigger--disabled`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for a collapsible trigger button.
 */
export function collapsibleTriggerModuleClasses(
  classMap: Record<string, string>,
  options: CollapsibleTriggerClassesOptions = {},
): string {
  const { open = false, disabled = false, size = "md" } = options

  const classes = [classMap[`${BASE}__trigger`], classMap[`${BASE}__trigger--${size}`]]

  if (open) classes.push(classMap[`${BASE}__trigger--open`])
  if (disabled) classes.push(classMap[`${BASE}__trigger--disabled`])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for a collapsible content panel.
 *
 * @example
 * ```ts
 * collapsibleContentClasses({ open: true }) // "pm-collapsible__content pm-collapsible__content--md pm-collapsible__content--open"
 * ```
 */
export function collapsibleContentClasses(options: CollapsibleContentClassesOptions = {}): string {
  const { open = false, size = "md" } = options
  const classes = [`${BASE}__content`, `${BASE}__content--${size}`]

  if (open) classes.push(`${BASE}__content--open`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for a collapsible content panel.
 */
export function collapsibleContentModuleClasses(
  classMap: Record<string, string>,
  options: CollapsibleContentClassesOptions = {},
): string {
  const { open = false, size = "md" } = options

  const classes = [classMap[`${BASE}__content`], classMap[`${BASE}__content--${size}`]]

  if (open) classes.push(classMap[`${BASE}__content--open`])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for the collapsible expand/collapse icon.
 *
 * @example
 * ```ts
 * collapsibleIconClasses({ open: true }) // "pm-collapsible__icon pm-collapsible__icon--open"
 * ```
 */
export function collapsibleIconClasses(options: CollapsibleIconClassesOptions = {}): string {
  const { open = false } = options
  const classes = [`${BASE}__icon`]

  if (open) classes.push(`${BASE}__icon--open`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the collapsible expand/collapse icon.
 */
export function collapsibleIconModuleClasses(
  classMap: Record<string, string>,
  options: CollapsibleIconClassesOptions = {},
): string {
  const { open = false } = options

  const classes = [classMap[`${BASE}__icon`]]

  if (open) classes.push(classMap[`${BASE}__icon--open`])

  return classes.filter(Boolean).join(" ")
}
