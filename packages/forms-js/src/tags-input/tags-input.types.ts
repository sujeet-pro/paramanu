import type { FormSize, InputVariant } from "../shared.types.js"

export interface TagsInputClassesOptions {
  variant?: InputVariant
  size?: FormSize
  disabled?: boolean
  invalid?: boolean
}

export interface TagsInputProps extends TagsInputClassesOptions {}
