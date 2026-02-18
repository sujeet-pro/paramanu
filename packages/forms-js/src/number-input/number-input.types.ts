import type { FormSize, InputVariant } from "../shared.types.js"

export interface NumberInputClassesOptions {
  variant?: InputVariant
  size?: FormSize
  invalid?: boolean
  disabled?: boolean
}

export interface NumberInputProps extends NumberInputClassesOptions {
  min?: number
  max?: number
  step?: number
}
