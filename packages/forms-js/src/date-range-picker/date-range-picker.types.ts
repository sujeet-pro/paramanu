import type { FormSize, InputVariant } from "../shared.types.js"

export interface DateRangePickerClassesOptions {
  variant?: InputVariant
  size?: FormSize
  invalid?: boolean
  disabled?: boolean
  open?: boolean
}

export interface DateRangePickerProps extends DateRangePickerClassesOptions {}
