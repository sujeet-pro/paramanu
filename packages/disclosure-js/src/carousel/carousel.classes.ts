import type {
  CarouselClassesOptions,
  CarouselSlideClassesOptions,
  CarouselControlClassesOptions,
  CarouselIndicatorClassesOptions,
} from "./carousel.types.js"

const BASE = "pm-carousel"

export function carouselClasses(options: CarouselClassesOptions = {}): string {
  const { orientation = "horizontal", size = "md" } = options
  const classes = [BASE, `${BASE}--${orientation}`, `${BASE}--${size}`]

  return classes.join(" ")
}

export function carouselModuleClasses(
  classMap: Record<string, string>,
  options: CarouselClassesOptions = {},
): string {
  const { orientation = "horizontal", size = "md" } = options

  const classes = [
    classMap[BASE],
    classMap[`${BASE}--${orientation}`],
    classMap[`${BASE}--${size}`],
  ]

  return classes.filter(Boolean).join(" ")
}

export function carouselSlideClasses(options: CarouselSlideClassesOptions = {}): string {
  const { active = false } = options
  const classes = [`${BASE}__slide`]

  if (active) classes.push(`${BASE}__slide--active`)

  return classes.join(" ")
}

export function carouselSlideModuleClasses(
  classMap: Record<string, string>,
  options: CarouselSlideClassesOptions = {},
): string {
  const { active = false } = options

  const classes = [classMap[`${BASE}__slide`]]

  if (active) classes.push(classMap[`${BASE}__slide--active`])

  return classes.filter(Boolean).join(" ")
}

export function carouselControlClasses(options: CarouselControlClassesOptions): string {
  const { direction, disabled = false } = options
  const classes = [`${BASE}__control`, `${BASE}__control--${direction}`]

  if (disabled) classes.push(`${BASE}__control--disabled`)

  return classes.join(" ")
}

export function carouselControlModuleClasses(
  classMap: Record<string, string>,
  options: CarouselControlClassesOptions,
): string {
  const { direction, disabled = false } = options

  const classes = [classMap[`${BASE}__control`], classMap[`${BASE}__control--${direction}`]]

  if (disabled) classes.push(classMap[`${BASE}__control--disabled`])

  return classes.filter(Boolean).join(" ")
}

export function carouselIndicatorClasses(options: CarouselIndicatorClassesOptions = {}): string {
  const { active = false } = options
  const classes = [`${BASE}__indicator`]

  if (active) classes.push(`${BASE}__indicator--active`)

  return classes.join(" ")
}

export function carouselIndicatorModuleClasses(
  classMap: Record<string, string>,
  options: CarouselIndicatorClassesOptions = {},
): string {
  const { active = false } = options

  const classes = [classMap[`${BASE}__indicator`]]

  if (active) classes.push(classMap[`${BASE}__indicator--active`])

  return classes.filter(Boolean).join(" ")
}
