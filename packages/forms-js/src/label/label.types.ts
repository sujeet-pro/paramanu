import type { FormSize } from "../shared.types.js"

export interface LabelClassesOptions {
  size?: FormSize
  disabled?: boolean
  required?: boolean
}

export interface LabelProps extends LabelClassesOptions {
  htmlFor?: string
}
