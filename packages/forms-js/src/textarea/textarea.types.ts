import type { FormSize, InputVariant } from "../shared.types.js"

export type TextareaResize = "none" | "vertical" | "horizontal" | "both"

export interface TextareaClassesOptions {
  variant?: InputVariant
  size?: FormSize
  invalid?: boolean
  disabled?: boolean
  readOnly?: boolean
  fullWidth?: boolean
  resize?: TextareaResize
}

export interface TextareaProps extends TextareaClassesOptions {
  rows?: number
}
