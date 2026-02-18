import type { FormSize, InputVariant } from "../shared.types.js"

export interface InputClassesOptions {
  variant?: InputVariant
  size?: FormSize
  invalid?: boolean
  disabled?: boolean
  readOnly?: boolean
  fullWidth?: boolean
}

export interface InputProps extends InputClassesOptions {
  type?: string
}
