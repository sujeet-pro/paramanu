import type { FormSize, InputVariant } from "../shared.types.js"

export interface CascaderClassesOptions {
  variant?: InputVariant
  size?: FormSize
  invalid?: boolean
  disabled?: boolean
  open?: boolean
  fullWidth?: boolean
}

export interface CascaderProps extends CascaderClassesOptions {}
