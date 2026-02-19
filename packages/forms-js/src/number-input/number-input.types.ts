import type { FormSize, InputVariant } from "../shared.types.js"

export interface NumInputClassesOptions {
  variant?: InputVariant
  size?: FormSize
  invalid?: boolean
  disabled?: boolean
}

export interface NumInputProps extends NumInputClassesOptions {
  min?: number
  max?: number
  step?: number
}
