import type { FormSize, InputVariant } from "../shared.types.js"

export interface MultiSelClassesOptions {
  variant?: InputVariant
  size?: FormSize
  invalid?: boolean
  disabled?: boolean
  open?: boolean
  fullWidth?: boolean
}

export interface MultiSelProps extends MultiSelClassesOptions {}
