import type { FormSize, InputVariant } from "../shared.types.js"

export interface SelectClassesOptions {
  variant?: InputVariant
  size?: FormSize
  invalid?: boolean
  disabled?: boolean
  open?: boolean
  fullWidth?: boolean
}

export interface SelectProps extends SelectClassesOptions {}
