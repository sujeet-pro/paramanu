import type {
  CarouselClassesOptions,
  CarouselViewportClassesOptions,
  CarouselTrackClassesOptions,
  CarouselSlideClassesOptions,
  CarouselControlClassesOptions,
  CarouselIndicatorClassesOptions,
} from "./carousel.types.js"

const BASE = "pm-carousel"

/**
 * Returns BEM class names for the carousel root element.
 *
 * @example
 * ```ts
 * carouselClasses() // "pm-carousel pm-carousel--horizontal pm-carousel--md"
 * carouselClasses({ orientation: "vertical", size: "lg" })
 * // "pm-carousel pm-carousel--vertical pm-carousel--lg"
 * ```
 */
export function carouselClasses(options: CarouselClassesOptions = {}): string {
  const { orientation = "horizontal", size = "md", showDots = true, showArrows = true } = options
  const classes = [BASE, `${BASE}--${orientation}`, `${BASE}--${size}`]

  if (!showDots) classes.push(`${BASE}--no-dots`)
  if (!showArrows) classes.push(`${BASE}--no-arrows`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the carousel root element.
 *
 * @example
 * ```ts
 * import styles from "./carousel.module.css"
 * carouselModuleClasses(styles, { orientation: "horizontal" })
 * ```
 */
export function carouselModuleClasses(
  classMap: Record<string, string>,
  options: CarouselClassesOptions = {},
): string {
  const { orientation = "horizontal", size = "md", showDots = true, showArrows = true } = options

  const classes = [
    classMap[BASE],
    classMap[`${BASE}--${orientation}`],
    classMap[`${BASE}--${size}`],
  ]

  if (!showDots) classes.push(classMap[`${BASE}--no-dots`])
  if (!showArrows) classes.push(classMap[`${BASE}--no-arrows`])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for the carousel viewport.
 *
 * @example
 * ```ts
 * carouselViewportClasses() // "pm-carousel__viewport"
 * ```
 */
export function carouselViewportClasses(options: CarouselViewportClassesOptions = {}): string {
  const { orientation = "horizontal" } = options
  return `${BASE}__viewport ${BASE}__viewport--${orientation}`
}

/**
 * Returns CSS module class names for the carousel viewport.
 */
export function carouselViewportModuleClasses(
  classMap: Record<string, string>,
  options: CarouselViewportClassesOptions = {},
): string {
  const { orientation = "horizontal" } = options

  const classes = [classMap[`${BASE}__viewport`], classMap[`${BASE}__viewport--${orientation}`]]

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for the carousel track.
 *
 * @example
 * ```ts
 * carouselTrackClasses({ dragging: true })
 * // "pm-carousel__track pm-carousel__track--horizontal pm-carousel__track--dragging"
 * ```
 */
export function carouselTrackClasses(options: CarouselTrackClassesOptions = {}): string {
  const { orientation = "horizontal", dragging = false } = options
  const classes = [`${BASE}__track`, `${BASE}__track--${orientation}`]

  if (dragging) classes.push(`${BASE}__track--dragging`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the carousel track.
 */
export function carouselTrackModuleClasses(
  classMap: Record<string, string>,
  options: CarouselTrackClassesOptions = {},
): string {
  const { orientation = "horizontal", dragging = false } = options

  const classes = [classMap[`${BASE}__track`], classMap[`${BASE}__track--${orientation}`]]

  if (dragging) classes.push(classMap[`${BASE}__track--dragging`])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for a carousel slide.
 *
 * @example
 * ```ts
 * carouselSlideClasses({ active: true }) // "pm-carousel__slide pm-carousel__slide--active"
 * ```
 */
export function carouselSlideClasses(options: CarouselSlideClassesOptions = {}): string {
  const { active = false } = options
  const classes = [`${BASE}__slide`]

  if (active) classes.push(`${BASE}__slide--active`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for a carousel slide.
 */
export function carouselSlideModuleClasses(
  classMap: Record<string, string>,
  options: CarouselSlideClassesOptions = {},
): string {
  const { active = false } = options

  const classes = [classMap[`${BASE}__slide`]]

  if (active) classes.push(classMap[`${BASE}__slide--active`])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for a carousel prev/next control button.
 *
 * @example
 * ```ts
 * carouselControlClasses({ direction: "next" })
 * // "pm-carousel__control pm-carousel__control--next"
 * ```
 */
export function carouselControlClasses(options: CarouselControlClassesOptions): string {
  const { direction, disabled = false } = options
  const classes = [`${BASE}__control`, `${BASE}__control--${direction}`]

  if (disabled) classes.push(`${BASE}__control--disabled`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for a carousel control button.
 */
export function carouselControlModuleClasses(
  classMap: Record<string, string>,
  options: CarouselControlClassesOptions,
): string {
  const { direction, disabled = false } = options

  const classes = [classMap[`${BASE}__control`], classMap[`${BASE}__control--${direction}`]]

  if (disabled) classes.push(classMap[`${BASE}__control--disabled`])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for a carousel indicator dot.
 *
 * @example
 * ```ts
 * carouselIndicatorClasses({ active: true }) // "pm-carousel__indicator pm-carousel__indicator--active"
 * ```
 */
export function carouselIndicatorClasses(options: CarouselIndicatorClassesOptions = {}): string {
  const { active = false } = options
  const classes = [`${BASE}__indicator`]

  if (active) classes.push(`${BASE}__indicator--active`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for a carousel indicator dot.
 */
export function carouselIndicatorModuleClasses(
  classMap: Record<string, string>,
  options: CarouselIndicatorClassesOptions = {},
): string {
  const { active = false } = options

  const classes = [classMap[`${BASE}__indicator`]]

  if (active) classes.push(classMap[`${BASE}__indicator--active`])

  return classes.filter(Boolean).join(" ")
}
