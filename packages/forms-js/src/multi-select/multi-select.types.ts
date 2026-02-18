import type { FormSize, InputVariant } from "../shared.types.js"

export interface MultiSelectClassesOptions {
  variant?: InputVariant
  size?: FormSize
  invalid?: boolean
  disabled?: boolean
  open?: boolean
  fullWidth?: boolean
}

export interface MultiSelectProps extends MultiSelectClassesOptions {}
