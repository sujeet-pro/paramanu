import type { FormSize } from "../shared.types.js"

export interface RadioCardClassesOptions {
  size?: FormSize
  disabled?: boolean
  checked?: boolean
}

export interface RadioCardProps extends RadioCardClassesOptions {
  name?: string
  value?: string
}
