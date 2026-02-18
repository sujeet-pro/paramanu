import type { FormSize, InputVariant } from "../shared.types.js"

export interface NativeSelectClassesOptions {
  variant?: InputVariant
  size?: FormSize
  invalid?: boolean
  disabled?: boolean
  fullWidth?: boolean
}

export interface NativeSelectProps extends NativeSelectClassesOptions {}
