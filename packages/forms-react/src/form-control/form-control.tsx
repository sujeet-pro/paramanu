import { forwardRef } from "react"
import { formCtrlClasses } from "@paramanu/forms-js"
import type { FormCtrlProps } from "@paramanu/forms-js"

export interface ReactFormCtrlProps
  extends FormCtrlProps,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  helperText?: React.ReactNode
  errorText?: React.ReactNode
}

export const FormCtrl = forwardRef<HTMLDivElement, ReactFormCtrlProps>(
  function FormCtrl(
    { orientation, invalid, disabled, required, helperText, errorText, className, children, ...rest },
    ref,
  ) {
    const classes = formCtrlClasses({ orientation, invalid, disabled, required })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div ref={ref} role="group" className={combinedClassName} {...rest}>
        {children}
        {helperText && !invalid && (
          <span className="pm-form-ctrl__helper-text">{helperText}</span>
        )}
        {errorText && invalid && (
          <span className="pm-form-ctrl__error-text">{errorText}</span>
        )}
      </div>
    )
  },
)
