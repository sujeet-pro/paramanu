import type { FormSize } from "../shared.types.js"

export interface CheckboxClassesOptions {
  size?: FormSize
  disabled?: boolean
  invalid?: boolean
  checked?: boolean
  indeterminate?: boolean
}

export interface CheckboxProps extends CheckboxClassesOptions {}
