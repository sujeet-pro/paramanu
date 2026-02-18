import type { FormSize, InputVariant } from "../shared.types.js"

/** Resize behavior for the textarea */
export type TextareaResize = "none" | "vertical" | "horizontal" | "both"

/** Options for generating textarea class names */
export interface TextareaClassesOptions {
  /** Visual variant of the textarea */
  variant?: InputVariant
  /** Size of the textarea */
  size?: FormSize
  /** Whether the textarea is in an invalid state */
  invalid?: boolean
  /** Whether the textarea is disabled */
  disabled?: boolean
  /** Whether the textarea is read-only */
  readOnly?: boolean
  /** Whether the textarea takes the full width of its container */
  fullWidth?: boolean
  /** Resize behavior */
  resize?: TextareaResize
  /** Whether autosize behavior is enabled */
  autosize?: boolean
}

/** Props for the textarea component */
export interface TextareaProps extends TextareaClassesOptions {
  /** Number of visible text lines */
  rows?: number
  /** Minimum number of rows when autosize is enabled */
  minRows?: number
  /** Maximum number of rows when autosize is enabled */
  maxRows?: number
  /** Placeholder text */
  placeholder?: string
  /** Controlled value */
  value?: string
  /** Default value for uncontrolled usage */
  defaultValue?: string
  /** Name attribute for form submission */
  name?: string
  /** Whether the textarea is required */
  required?: boolean
  /** Callback fired when value changes */
  onChange?: (event: Event) => void
  /** Callback fired when textarea receives focus */
  onFocus?: (event: FocusEvent) => void
  /** Callback fired when textarea loses focus */
  onBlur?: (event: FocusEvent) => void
}
