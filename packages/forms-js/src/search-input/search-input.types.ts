import type { FormSize, InputVariant } from "../shared.types.js"

export interface SearchClassesOptions {
  variant?: InputVariant
  size?: FormSize
  invalid?: boolean
  disabled?: boolean
  fullWidth?: boolean
}

export interface SearchProps extends SearchClassesOptions {}
