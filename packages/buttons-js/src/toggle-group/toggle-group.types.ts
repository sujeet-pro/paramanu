export type ToggleGroupType = "single" | "multiple"

export type ToggleGroupOrientation = "horizontal" | "vertical"

export type ToggleGroupSize = "sm" | "md" | "lg"

export interface ToggleGroupClassesOptions {
  orientation?: ToggleGroupOrientation
  size?: ToggleGroupSize
  attached?: boolean
}

export interface ToggleGroupItemClassesOptions {
  size?: ToggleGroupSize
  pressed?: boolean
  disabled?: boolean
}
