export type ProgressBarSize = "xs" | "sm" | "md" | "lg"

export type ProgressBarVariant = "primary" | "success" | "warning" | "danger"

export interface ProgressBarClassesOptions {
  size?: ProgressBarSize
  variant?: ProgressBarVariant
  striped?: boolean
  animated?: boolean
  indeterminate?: boolean
  value?: number
  min?: number
  max?: number
}
