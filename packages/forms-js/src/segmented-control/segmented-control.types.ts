import type { FormSize } from "../shared.types.js"

export interface SegmentedControlClassesOptions {
  size?: FormSize
  fullWidth?: boolean
}

export interface SegmentedControlProps extends SegmentedControlClassesOptions {}
