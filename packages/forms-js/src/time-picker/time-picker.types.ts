import type { FormSize, InputVariant } from "../shared.types.js"

export interface TimePickerClassesOptions {
  variant?: InputVariant
  size?: FormSize
  invalid?: boolean
  disabled?: boolean
  open?: boolean
}

export interface TimePickerProps extends TimePickerClassesOptions {}
