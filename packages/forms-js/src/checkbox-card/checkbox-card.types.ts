import type { FormSize } from "../shared.types.js"

export interface ChkCardClassesOptions {
  size?: FormSize
  disabled?: boolean
  checked?: boolean
}

export interface ChkCardProps extends ChkCardClassesOptions {}
