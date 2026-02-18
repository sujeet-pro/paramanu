import type { FormSize } from "../shared.types.js"

export interface RatingClassesOptions {
  size?: FormSize
  disabled?: boolean
  readOnly?: boolean
}

export interface RatingProps extends RatingClassesOptions {
  count?: number
}
