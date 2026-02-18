import type { FormSize } from "../shared.types.js"

export type SwitchLabelPlacement = "start" | "end"

export interface SwitchClassesOptions {
  size?: FormSize
  disabled?: boolean
  checked?: boolean
  labelPlacement?: SwitchLabelPlacement
}

export interface SwitchProps extends SwitchClassesOptions {}
