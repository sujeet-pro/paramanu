import type { FormSize, InputVariant } from "../shared.types.js"

export interface TimepickerClassesOptions {
  variant?: InputVariant
  size?: FormSize
  invalid?: boolean
  disabled?: boolean
  open?: boolean
}

export interface TimepickerProps extends TimepickerClassesOptions {}
