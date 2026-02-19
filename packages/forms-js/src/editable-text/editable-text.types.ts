import type { FormSize } from "../shared.types.js"

export interface EditableClassesOptions {
  size?: FormSize
  disabled?: boolean
  editing?: boolean
}

export interface EditableProps extends EditableClassesOptions {}
