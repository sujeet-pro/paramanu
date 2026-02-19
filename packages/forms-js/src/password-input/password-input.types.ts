import type { FormSize, InputVariant } from "../shared.types.js"

/** Options for generating password input class names */
export interface PwdInputClassesOptions {
  /** Visual variant of the input */
  variant?: InputVariant
  /** Size of the input */
  size?: FormSize
  /** Whether the input is in an invalid state */
  invalid?: boolean
  /** Whether the input is disabled */
  disabled?: boolean
  /** Whether the input takes full width */
  fullWidth?: boolean
  /** Whether the password is currently visible */
  visible?: boolean
}

/** Props for the password input component */
export interface PwdInputProps extends PwdInputClassesOptions {
  /** Placeholder text */
  placeholder?: string
  /** Controlled value */
  value?: string
  /** Default value for uncontrolled usage */
  defaultValue?: string
  /** Name attribute for form submission */
  name?: string
  /** Whether the input is required */
  required?: boolean
  /** Callback fired when visibility toggles */
  onVisibilityChange?: (visible: boolean) => void
  /** Callback fired when value changes */
  onChange?: (event: Event) => void
}
