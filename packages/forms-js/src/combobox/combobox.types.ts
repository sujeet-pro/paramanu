import type { FormSize, InputVariant } from "../shared.types.js"

export interface ComboboxClassesOptions {
  variant?: InputVariant
  size?: FormSize
  invalid?: boolean
  disabled?: boolean
  open?: boolean
  fullWidth?: boolean
}

export interface ComboboxProps extends ComboboxClassesOptions {}
