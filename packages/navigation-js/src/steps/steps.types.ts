/** Size preset for the stepper component */
export type StepsSize = "sm" | "md" | "lg"

/** Layout orientation for the stepper */
export type StepsOrientation = "horizontal" | "vertical"

/** Status of an individual step */
export type StepStatus = "incomplete" | "active" | "complete"

/**
 * Options for generating steps container CSS class names.
 * Used by both BEM (`stepsClasses`) and CSS module (`stepsModuleClasses`) builders.
 */
export interface StepsClassesOptions {
  /** Size preset controlling indicator dimensions and font-size. @default "md" */
  size?: StepsSize
  /** Layout direction of the stepper. @default "horizontal" */
  orientation?: StepsOrientation
}

/**
 * Options for generating individual step CSS class names.
 */
export interface StepClassesOptions {
  /** Current status of this step. @default "incomplete" */
  status?: StepStatus
}

/**
 * Options for generating step indicator (circle/number) CSS class names.
 */
export interface StepIndicatorClassesOptions {
  /** Current status of the parent step, controlling indicator color. @default "incomplete" */
  status?: StepStatus
}

/**
 * Options for generating step connector (line between steps) CSS class names.
 */
export interface StepConnectorClassesOptions {
  /** Status of the connector, usually matching the step before it. @default "incomplete" */
  status?: StepStatus
}

/**
 * Options for generating step content (title/description area) CSS class names.
 */
export interface StepContentClassesOptions {}
