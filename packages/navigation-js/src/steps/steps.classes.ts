import type {
  StepsClassesOptions,
  StepClassesOptions,
  StepIndicatorClassesOptions,
  StepConnectorClassesOptions,
  StepContentClassesOptions,
} from "./steps.types.js"

const BASE = "pm-steps"

export function stepsClasses(options: StepsClassesOptions = {}): string {
  const { size = "md", orientation = "horizontal" } = options
  const classes = [BASE, `${BASE}--${size}`, `${BASE}--${orientation}`]
  return classes.join(" ")
}

export function stepsModuleClasses(
  classMap: Record<string, string>,
  options: StepsClassesOptions = {},
): string {
  const { size = "md", orientation = "horizontal" } = options
  const classes = [
    classMap[BASE],
    classMap[`${BASE}--${size}`],
    classMap[`${BASE}--${orientation}`],
  ]
  return classes.filter(Boolean).join(" ")
}

const STEP_BASE = "pm-steps__step"

export function stepClasses(options: StepClassesOptions = {}): string {
  const { status = "incomplete" } = options
  const classes = [STEP_BASE, `${STEP_BASE}--${status}`]
  return classes.join(" ")
}

export function stepModuleClasses(
  classMap: Record<string, string>,
  options: StepClassesOptions = {},
): string {
  const { status = "incomplete" } = options
  const classes = [classMap[STEP_BASE], classMap[`${STEP_BASE}--${status}`]]
  return classes.filter(Boolean).join(" ")
}

const INDICATOR_BASE = "pm-steps__indicator"

export function stepIndicatorClasses(options: StepIndicatorClassesOptions = {}): string {
  const { status = "incomplete" } = options
  const classes = [INDICATOR_BASE, `${INDICATOR_BASE}--${status}`]
  return classes.join(" ")
}

export function stepIndicatorModuleClasses(
  classMap: Record<string, string>,
  options: StepIndicatorClassesOptions = {},
): string {
  const { status = "incomplete" } = options
  const classes = [classMap[INDICATOR_BASE], classMap[`${INDICATOR_BASE}--${status}`]]
  return classes.filter(Boolean).join(" ")
}

const CONNECTOR_BASE = "pm-steps__connector"

export function stepConnectorClasses(options: StepConnectorClassesOptions = {}): string {
  const { status = "incomplete" } = options
  const classes = [CONNECTOR_BASE, `${CONNECTOR_BASE}--${status}`]
  return classes.join(" ")
}

export function stepConnectorModuleClasses(
  classMap: Record<string, string>,
  options: StepConnectorClassesOptions = {},
): string {
  const { status = "incomplete" } = options
  const classes = [classMap[CONNECTOR_BASE], classMap[`${CONNECTOR_BASE}--${status}`]]
  return classes.filter(Boolean).join(" ")
}

const CONTENT_BASE = "pm-steps__content"

export function stepContentClasses(_options: StepContentClassesOptions = {}): string {
  return CONTENT_BASE
}

export function stepContentModuleClasses(
  classMap: Record<string, string>,
  _options: StepContentClassesOptions = {},
): string {
  return classMap[CONTENT_BASE] || ""
}
