import { forwardRef } from "react"
import { floatClasses } from "@paramanu/primitives-js"
import type { FloatProps } from "@paramanu/primitives-js"

export interface ReactFloatProps
  extends FloatProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children?: React.ReactNode
}

export const Float = forwardRef<HTMLDivElement, ReactFloatProps>(function Float(
  { placement, offset, className, children, ...rest },
  ref,
) {
  const classes = floatClasses({ placement, offset })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
