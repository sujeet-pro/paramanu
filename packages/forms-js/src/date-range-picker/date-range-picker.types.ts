import type { FormSize, InputVariant } from "../shared.types.js"

export interface DaterangeClassesOptions {
  variant?: InputVariant
  size?: FormSize
  invalid?: boolean
  disabled?: boolean
  open?: boolean
}

export interface DaterangeProps extends DaterangeClassesOptions {}
