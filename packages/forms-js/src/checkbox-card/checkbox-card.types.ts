import type { FormSize } from "../shared.types.js"

export interface CheckboxCardClassesOptions {
  size?: FormSize
  disabled?: boolean
  checked?: boolean
}

export interface CheckboxCardProps extends CheckboxCardClassesOptions {}
