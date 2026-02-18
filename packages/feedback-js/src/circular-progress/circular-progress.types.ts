export type CircularProgressSize = "sm" | "md" | "lg" | "xl"

export type CircularProgressVariant = "primary" | "success" | "warning" | "danger"

export interface CircularProgressClassesOptions {
  size?: CircularProgressSize
  variant?: CircularProgressVariant
  indeterminate?: boolean
  value?: number
  min?: number
  max?: number
}
