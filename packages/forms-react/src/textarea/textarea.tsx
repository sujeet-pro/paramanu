import { forwardRef } from "react"
import { textareaClasses } from "@paramanu/forms-js"
import type { TextareaProps } from "@paramanu/forms-js"

export interface ReactTextareaProps
  extends Omit<TextareaProps, "onChange" | "onFocus" | "onBlur">,
    Omit<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      "size" | "value" | "defaultValue"
    > {
  children?: React.ReactNode
}

export const Textarea = forwardRef<HTMLTextAreaElement, ReactTextareaProps>(function Textarea(
  { variant, size, disabled, invalid, readOnly, fullWidth, resize, rows, className, ...rest },
  ref,
) {
  const classes = textareaClasses({ variant, size, disabled, invalid, readOnly, fullWidth, resize })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <textarea
      ref={ref}
      className={combinedClassName}
      rows={rows}
      disabled={disabled}
      readOnly={readOnly}
      aria-invalid={invalid || undefined}
      aria-disabled={disabled || undefined}
      {...rest}
    />
  )
})
