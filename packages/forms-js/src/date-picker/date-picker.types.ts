import type { FormSize, InputVariant } from "../shared.types.js"

export interface DatepickerClassesOptions {
  variant?: InputVariant
  size?: FormSize
  invalid?: boolean
  disabled?: boolean
  open?: boolean
}

export interface DatepickerProps extends DatepickerClassesOptions {}
