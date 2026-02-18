import type { FormSize, InputVariant } from "../shared.types.js"

export interface PasswordInputClassesOptions {
  variant?: InputVariant
  size?: FormSize
  invalid?: boolean
  disabled?: boolean
}

export interface PasswordInputProps extends PasswordInputClassesOptions {}
