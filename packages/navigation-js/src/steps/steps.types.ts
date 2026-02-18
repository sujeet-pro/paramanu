export type StepsSize = "sm" | "md" | "lg"

export type StepsOrientation = "horizontal" | "vertical"

export type StepStatus = "incomplete" | "active" | "complete"

export interface StepsClassesOptions {
  size?: StepsSize
  orientation?: StepsOrientation
}

export interface StepClassesOptions {
  status?: StepStatus
}

export interface StepIndicatorClassesOptions {
  status?: StepStatus
}

export interface StepConnectorClassesOptions {
  status?: StepStatus
}

export interface StepContentClassesOptions {}
