import { forwardRef } from "react"
import { formClasses } from "@paramanu/forms-js"
import type { FormProps } from "@paramanu/forms-js"

export interface ReactFormProps extends FormProps, React.FormHTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode
}

export const Form = forwardRef<HTMLFormElement, ReactFormProps>(function Form(
  { layout, gap, className, children, ...rest },
  ref,
) {
  const classes = formClasses({ layout, gap })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <form ref={ref} className={combinedClassName} {...rest}>
      {children}
    </form>
  )
})
