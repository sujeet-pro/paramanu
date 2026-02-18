import type { FormSize } from "../shared.types.js"

export interface ColorPickerClassesOptions {
  size?: FormSize
  disabled?: boolean
  open?: boolean
}

export interface ColorPickerProps extends ColorPickerClassesOptions {}
