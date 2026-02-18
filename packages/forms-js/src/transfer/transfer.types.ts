import type { FormSize } from "../shared.types.js"

export interface TransferClassesOptions {
  size?: FormSize
  disabled?: boolean
}

export interface TransferProps extends TransferClassesOptions {}
