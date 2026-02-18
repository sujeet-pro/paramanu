import { forwardRef } from "react"
import { inputClasses } from "@paramanu/forms-js"
import type { InputProps } from "@paramanu/forms-js"

export interface ReactInputProps
  extends Omit<InputProps, "onChange" | "onFocus" | "onBlur">,
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "type" | "value" | "defaultValue"
    > {
  children?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, ReactInputProps>(function Input(
  { variant, size, disabled, invalid, readOnly, fullWidth, type = "text", className, ...rest },
  ref,
) {
  const classes = inputClasses({ variant, size, disabled, invalid, readOnly, fullWidth })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <input
      ref={ref}
      type={type}
      className={combinedClassName}
      disabled={disabled}
      readOnly={readOnly}
      aria-invalid={invalid || undefined}
      aria-disabled={disabled || undefined}
      {...rest}
    />
  )
})
