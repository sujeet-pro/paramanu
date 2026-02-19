import type { FormSize } from "../shared.types.js"

export interface ColorpickerClassesOptions {
  size?: FormSize
  disabled?: boolean
  open?: boolean
}

export interface ColorpickerProps extends ColorpickerClassesOptions {}
