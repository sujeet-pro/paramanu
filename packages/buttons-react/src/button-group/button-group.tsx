import { forwardRef } from "react"
import { buttonGroupClasses } from "@paramanu/buttons-js"
import type { ButtonGroupClassesOptions } from "@paramanu/buttons-js"

export interface ReactButtonGroupProps
  extends ButtonGroupClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const ButtonGroup = forwardRef<HTMLDivElement, ReactButtonGroupProps>(function ButtonGroup(
  { orientation, attached, className, children, role = "group", ...rest },
  ref,
) {
  const classes = buttonGroupClasses({ orientation, attached })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} role={role} {...rest}>
      {children}
    </div>
  )
})
