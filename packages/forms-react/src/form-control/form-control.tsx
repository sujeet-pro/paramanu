import { forwardRef } from "react"
import { formControlClasses } from "@paramanu/forms-js"
import type { FormControlProps } from "@paramanu/forms-js"

export interface ReactFormControlProps
  extends FormControlProps,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  helperText?: React.ReactNode
  errorText?: React.ReactNode
}

export const FormControl = forwardRef<HTMLDivElement, ReactFormControlProps>(
  function FormControl(
    { orientation, invalid, disabled, required, helperText, errorText, className, children, ...rest },
    ref,
  ) {
    const classes = formControlClasses({ orientation, invalid, disabled, required })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div ref={ref} role="group" className={combinedClassName} {...rest}>
        {children}
        {helperText && !invalid && (
          <span className="pm-form-control__helper-text">{helperText}</span>
        )}
        {errorText && invalid && (
          <span className="pm-form-control__error-text">{errorText}</span>
        )}
      </div>
    )
  },
)
