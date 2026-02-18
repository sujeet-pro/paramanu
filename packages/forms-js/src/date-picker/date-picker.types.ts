import type { FormSize, InputVariant } from "../shared.types.js"

export interface DatePickerClassesOptions {
  variant?: InputVariant
  size?: FormSize
  invalid?: boolean
  disabled?: boolean
  open?: boolean
}

export interface DatePickerProps extends DatePickerClassesOptions {}
