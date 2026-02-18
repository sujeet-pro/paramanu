import type { FormSize } from "../shared.types.js"

export interface RadioClassesOptions {
  size?: FormSize
  disabled?: boolean
  invalid?: boolean
  checked?: boolean
}

export interface RadioProps extends RadioClassesOptions {
  name?: string
  value?: string
}

export interface RadioGroupClassesOptions {
  orientation?: "horizontal" | "vertical"
  size?: FormSize
}

export interface RadioGroupProps extends RadioGroupClassesOptions {
  name?: string
}
