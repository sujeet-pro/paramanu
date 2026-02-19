import type { FormSize, InputVariant } from "../shared.types.js"

export interface NativeSelClassesOptions {
  variant?: InputVariant
  size?: FormSize
  invalid?: boolean
  disabled?: boolean
  fullWidth?: boolean
}

export interface NativeSelProps extends NativeSelClassesOptions {}
