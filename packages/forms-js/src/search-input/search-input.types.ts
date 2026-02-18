import type { FormSize, InputVariant } from "../shared.types.js"

export interface SearchInputClassesOptions {
  variant?: InputVariant
  size?: FormSize
  invalid?: boolean
  disabled?: boolean
  fullWidth?: boolean
}

export interface SearchInputProps extends SearchInputClassesOptions {}
