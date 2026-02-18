import { forwardRef } from "react"
import { visuallyHiddenClasses } from "@paramanu/utilities-js"
import type { VisuallyHiddenClassesOptions } from "@paramanu/utilities-js"

export interface ReactVisuallyHiddenProps
  extends VisuallyHiddenClassesOptions,
    React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  children?: React.ReactNode
}

export const VisuallyHidden = forwardRef<HTMLElement, ReactVisuallyHiddenProps>(
  function VisuallyHidden({ as: Component = "span", focusable, className, children, ...rest }, ref) {
    const classes = visuallyHiddenClasses({ focusable })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <Component ref={ref} className={combinedClassName} {...rest}>
        {children}
      </Component>
    )
  },
)
