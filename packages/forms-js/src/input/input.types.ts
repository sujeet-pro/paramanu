import type { FormSize, InputVariant } from "../shared.types.js"

/** Options for generating input class names */
export interface InputClassesOptions {
  /** Visual variant of the input */
  variant?: InputVariant
  /** Size of the input */
  size?: FormSize
  /** Whether the input is in an invalid state */
  invalid?: boolean
  /** Whether the input is disabled */
  disabled?: boolean
  /** Whether the input is read-only */
  readOnly?: boolean
  /** Whether the input takes the full width of its container */
  fullWidth?: boolean
}

/** Props for the input component */
export interface InputProps extends InputClassesOptions {
  /** HTML input type attribute */
  type?: string
  /** Placeholder text */
  placeholder?: string
  /** Controlled value */
  value?: string | number
  /** Default value for uncontrolled usage */
  defaultValue?: string | number
  /** Name attribute for form submission */
  name?: string
  /** Whether the input is required */
  required?: boolean
  /** Callback fired when value changes */
  onChange?: (event: Event) => void
  /** Callback fired when input receives focus */
  onFocus?: (event: FocusEvent) => void
  /** Callback fired when input loses focus */
  onBlur?: (event: FocusEvent) => void
}
