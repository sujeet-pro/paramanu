import { forwardRef } from "react"
import { labelClasses } from "@paramanu/forms-js"
import type { LabelProps } from "@paramanu/forms-js"

export interface ReactLabelProps
  extends LabelProps,
    Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "form"> {
  children?: React.ReactNode
}

export const Label = forwardRef<HTMLLabelElement, ReactLabelProps>(function Label(
  { size, disabled, required, htmlFor, className, children, ...rest },
  ref,
) {
  const classes = labelClasses({ size, disabled, required })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={combinedClassName}
      aria-required={required || undefined}
      {...rest}
    >
      {children}
    </label>
  )
})
