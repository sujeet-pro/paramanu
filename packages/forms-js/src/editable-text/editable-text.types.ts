import type { FormSize } from "../shared.types.js"

export interface EditableTextClassesOptions {
  size?: FormSize
  disabled?: boolean
  editing?: boolean
}

export interface EditableTextProps extends EditableTextClassesOptions {}
