import { forwardRef } from "react"
import { fieldsetClasses } from "@paramanu/forms-js"
import type { FieldsetProps } from "@paramanu/forms-js"

export interface ReactFieldsetProps
  extends FieldsetProps, Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, "form"> {
  children?: React.ReactNode
}

export const Fieldset = forwardRef<HTMLFieldSetElement, ReactFieldsetProps>(function Fieldset(
  { variant, disabled, legend, className, children, ...rest },
  ref,
) {
  const classes = fieldsetClasses({ variant, disabled })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <fieldset ref={ref} className={combinedClassName} disabled={disabled} {...rest}>
      {legend && <legend className="pm-fieldset__legend">{legend}</legend>}
      {children}
    </fieldset>
  )
})
