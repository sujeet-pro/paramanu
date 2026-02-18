import type {
  TourClassesOptions,
  TourStepClassesOptions,
  TourOverlayClassesOptions,
} from "./tour.types.js"

const BASE = "pm-tour"

export function tourClasses(options: TourClassesOptions = {}): string {
  const { open = false } = options
  const classes = [BASE]

  if (open) classes.push(`${BASE}--open`)

  return classes.join(" ")
}

export function tourModuleClasses(
  classMap: Record<string, string>,
  options: TourClassesOptions = {},
): string {
  const { open = false } = options

  const classes = [classMap[BASE]]

  if (open) classes.push(classMap[`${BASE}--open`])

  return classes.filter(Boolean).join(" ")
}

export function tourStepClasses(options: TourStepClassesOptions = {}): string {
  const { placement = "bottom", active = false } = options
  const classes = [`${BASE}__step`, `${BASE}__step--${placement}`]

  if (active) classes.push(`${BASE}__step--active`)

  return classes.join(" ")
}

export function tourStepModuleClasses(
  classMap: Record<string, string>,
  options: TourStepClassesOptions = {},
): string {
  const { placement = "bottom", active = false } = options

  const classes = [classMap[`${BASE}__step`], classMap[`${BASE}__step--${placement}`]]

  if (active) classes.push(classMap[`${BASE}__step--active`])

  return classes.filter(Boolean).join(" ")
}

export function tourOverlayClasses(options: TourOverlayClassesOptions = {}): string {
  const { visible = false } = options
  const classes = [`${BASE}__overlay`]

  if (visible) classes.push(`${BASE}__overlay--visible`)

  return classes.join(" ")
}

export function tourOverlayModuleClasses(
  classMap: Record<string, string>,
  options: TourOverlayClassesOptions = {},
): string {
  const { visible = false } = options

  const classes = [classMap[`${BASE}__overlay`]]

  if (visible) classes.push(classMap[`${BASE}__overlay--visible`])

  return classes.filter(Boolean).join(" ")
}
