import type {
  TourClassesOptions,
  TourStepClassesOptions,
  TourOverlayClassesOptions,
  TourSpotlightClassesOptions,
  TourCloseClassesOptions,
} from "./tour.types.js"

const BASE = "pm-tour"

/**
 * Returns BEM class names for the tour root element.
 *
 * @example
 * ```ts
 * tourClasses() // "pm-tour"
 * tourClasses({ open: true }) // "pm-tour pm-tour--open"
 * ```
 */
export function tourClasses(options: TourClassesOptions = {}): string {
  const { open = false } = options
  const classes = [BASE]

  if (open) classes.push(`${BASE}--open`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the tour root element.
 *
 * @example
 * ```ts
 * import styles from "./tour.module.css"
 * tourModuleClasses(styles, { open: true })
 * ```
 */
export function tourModuleClasses(
  classMap: Record<string, string>,
  options: TourClassesOptions = {},
): string {
  const { open = false } = options

  const classes = [classMap[BASE]]

  if (open) classes.push(classMap[`${BASE}--open`])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for a tour step popover.
 *
 * @example
 * ```ts
 * tourStepClasses({ placement: "top", active: true })
 * // "pm-tour__step pm-tour__step--top pm-tour__step--default pm-tour__step--active"
 * ```
 */
export function tourStepClasses(options: TourStepClassesOptions = {}): string {
  const { placement = "bottom", active = false, variant = "default" } = options
  const classes = [`${BASE}__step`, `${BASE}__step--${placement}`, `${BASE}__step--${variant}`]

  if (active) classes.push(`${BASE}__step--active`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for a tour step popover.
 */
export function tourStepModuleClasses(
  classMap: Record<string, string>,
  options: TourStepClassesOptions = {},
): string {
  const { placement = "bottom", active = false, variant = "default" } = options

  const classes = [
    classMap[`${BASE}__step`],
    classMap[`${BASE}__step--${placement}`],
    classMap[`${BASE}__step--${variant}`],
  ]

  if (active) classes.push(classMap[`${BASE}__step--active`])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for the tour overlay.
 *
 * @example
 * ```ts
 * tourOverlayClasses({ visible: true }) // "pm-tour__overlay pm-tour__overlay--visible"
 * ```
 */
export function tourOverlayClasses(options: TourOverlayClassesOptions = {}): string {
  const { visible = false } = options
  const classes = [`${BASE}__overlay`]

  if (visible) classes.push(`${BASE}__overlay--visible`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the tour overlay.
 */
export function tourOverlayModuleClasses(
  classMap: Record<string, string>,
  options: TourOverlayClassesOptions = {},
): string {
  const { visible = false } = options

  const classes = [classMap[`${BASE}__overlay`]]

  if (visible) classes.push(classMap[`${BASE}__overlay--visible`])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for the tour spotlight (target highlight).
 *
 * @example
 * ```ts
 * tourSpotlightClasses({ visible: true }) // "pm-tour__spotlight pm-tour__spotlight--visible"
 * ```
 */
export function tourSpotlightClasses(options: TourSpotlightClassesOptions = {}): string {
  const { visible = false } = options
  const classes = [`${BASE}__spotlight`]

  if (visible) classes.push(`${BASE}__spotlight--visible`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the tour spotlight.
 */
export function tourSpotlightModuleClasses(
  classMap: Record<string, string>,
  options: TourSpotlightClassesOptions = {},
): string {
  const { visible = false } = options

  const classes = [classMap[`${BASE}__spotlight`]]

  if (visible) classes.push(classMap[`${BASE}__spotlight--visible`])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for the tour step close button.
 *
 * @example
 * ```ts
 * tourCloseClasses() // "pm-tour__step-close pm-tour__step-close--default"
 * ```
 */
export function tourCloseClasses(options: TourCloseClassesOptions = {}): string {
  const { variant = "default" } = options
  return `${BASE}__step-close ${BASE}__step-close--${variant}`
}

/**
 * Returns CSS module class names for the tour step close button.
 */
export function tourCloseModuleClasses(
  classMap: Record<string, string>,
  options: TourCloseClassesOptions = {},
): string {
  const { variant = "default" } = options

  const classes = [classMap[`${BASE}__step-close`], classMap[`${BASE}__step-close--${variant}`]]

  return classes.filter(Boolean).join(" ")
}
