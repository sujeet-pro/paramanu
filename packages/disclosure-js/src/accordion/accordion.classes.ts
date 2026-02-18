import type {
  AccordionClassesOptions,
  AccordionItemClassesOptions,
  AccordionTriggerClassesOptions,
  AccordionContentClassesOptions,
  AccordionIconClassesOptions,
} from "./accordion.types.js"

const BASE = "pm-accordion"

/**
 * Returns BEM class names for the accordion root element.
 *
 * @example
 * ```ts
 * accordionClasses() // "pm-accordion pm-accordion--default pm-accordion--md"
 * accordionClasses({ variant: "separated", size: "lg" })
 * // "pm-accordion pm-accordion--separated pm-accordion--lg"
 * ```
 */
export function accordionClasses(options: AccordionClassesOptions = {}): string {
  const { variant = "default", size = "md" } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`]

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the accordion root element.
 *
 * @example
 * ```ts
 * import styles from "./accordion.module.css"
 * accordionModuleClasses(styles, { variant: "bordered" })
 * ```
 */
export function accordionModuleClasses(
  classMap: Record<string, string>,
  options: AccordionClassesOptions = {},
): string {
  const { variant = "default", size = "md" } = options

  const classes = [classMap[BASE], classMap[`${BASE}--${variant}`], classMap[`${BASE}--${size}`]]

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for an accordion item.
 *
 * @example
 * ```ts
 * accordionItemClasses({ open: true }) // "pm-accordion__item pm-accordion__item--default pm-accordion__item--open"
 * ```
 */
export function accordionItemClasses(options: AccordionItemClassesOptions = {}): string {
  const { open = false, disabled = false, variant = "default" } = options
  const classes = [`${BASE}__item`, `${BASE}__item--${variant}`]

  if (open) classes.push(`${BASE}__item--open`)
  if (disabled) classes.push(`${BASE}__item--disabled`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for an accordion item.
 */
export function accordionItemModuleClasses(
  classMap: Record<string, string>,
  options: AccordionItemClassesOptions = {},
): string {
  const { open = false, disabled = false, variant = "default" } = options

  const classes = [classMap[`${BASE}__item`], classMap[`${BASE}__item--${variant}`]]

  if (open) classes.push(classMap[`${BASE}__item--open`])
  if (disabled) classes.push(classMap[`${BASE}__item--disabled`])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for an accordion trigger button.
 *
 * @example
 * ```ts
 * accordionTriggerClasses({ open: true, size: "lg" })
 * // "pm-accordion__trigger pm-accordion__trigger--lg pm-accordion__trigger--open"
 * ```
 */
export function accordionTriggerClasses(options: AccordionTriggerClassesOptions = {}): string {
  const { open = false, disabled = false, size = "md" } = options
  const classes = [`${BASE}__trigger`, `${BASE}__trigger--${size}`]

  if (open) classes.push(`${BASE}__trigger--open`)
  if (disabled) classes.push(`${BASE}__trigger--disabled`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for an accordion trigger button.
 */
export function accordionTriggerModuleClasses(
  classMap: Record<string, string>,
  options: AccordionTriggerClassesOptions = {},
): string {
  const { open = false, disabled = false, size = "md" } = options

  const classes = [classMap[`${BASE}__trigger`], classMap[`${BASE}__trigger--${size}`]]

  if (open) classes.push(classMap[`${BASE}__trigger--open`])
  if (disabled) classes.push(classMap[`${BASE}__trigger--disabled`])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for an accordion content panel.
 *
 * @example
 * ```ts
 * accordionContentClasses({ open: true }) // "pm-accordion__content pm-accordion__content--md pm-accordion__content--open"
 * ```
 */
export function accordionContentClasses(options: AccordionContentClassesOptions = {}): string {
  const { open = false, size = "md" } = options
  const classes = [`${BASE}__content`, `${BASE}__content--${size}`]

  if (open) classes.push(`${BASE}__content--open`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for an accordion content panel.
 */
export function accordionContentModuleClasses(
  classMap: Record<string, string>,
  options: AccordionContentClassesOptions = {},
): string {
  const { open = false, size = "md" } = options

  const classes = [classMap[`${BASE}__content`], classMap[`${BASE}__content--${size}`]]

  if (open) classes.push(classMap[`${BASE}__content--open`])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for the accordion expand/collapse icon.
 *
 * @example
 * ```ts
 * accordionIconClasses({ open: true }) // "pm-accordion__icon pm-accordion__icon--open"
 * ```
 */
export function accordionIconClasses(options: AccordionIconClassesOptions = {}): string {
  const { open = false } = options
  const classes = [`${BASE}__icon`]

  if (open) classes.push(`${BASE}__icon--open`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the accordion expand/collapse icon.
 */
export function accordionIconModuleClasses(
  classMap: Record<string, string>,
  options: AccordionIconClassesOptions = {},
): string {
  const { open = false } = options

  const classes = [classMap[`${BASE}__icon`]]

  if (open) classes.push(classMap[`${BASE}__icon--open`])

  return classes.filter(Boolean).join(" ")
}
