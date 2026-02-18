import type { FormSize } from "../shared.types.js"

export interface PinInputClassesOptions {
  size?: FormSize
  disabled?: boolean
  invalid?: boolean
}

export interface PinInputProps extends PinInputClassesOptions {
  length?: number
}
