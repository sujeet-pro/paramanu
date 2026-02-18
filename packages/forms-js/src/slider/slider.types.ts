import type { FormSize } from "../shared.types.js"

export type SliderOrientation = "horizontal" | "vertical"

export interface SliderClassesOptions {
  size?: FormSize
  disabled?: boolean
  orientation?: SliderOrientation
  showMarks?: boolean
}

export interface SliderProps extends SliderClassesOptions {
  min?: number
  max?: number
  step?: number
}
