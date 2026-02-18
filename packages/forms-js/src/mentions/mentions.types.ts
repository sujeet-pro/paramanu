import type { FormSize, InputVariant } from "../shared.types.js"

export interface MentionsClassesOptions {
  variant?: InputVariant
  size?: FormSize
  invalid?: boolean
  disabled?: boolean
}

export interface MentionsProps extends MentionsClassesOptions {}
