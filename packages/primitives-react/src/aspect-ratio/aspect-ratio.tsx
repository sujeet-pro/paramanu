import { forwardRef } from "react"
import { aspectClasses } from "@paramanu/primitives-js"
import type { AspectProps } from "@paramanu/primitives-js"

export interface ReactAspectProps
  extends AspectProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children?: React.ReactNode
}

export const Aspect = forwardRef<HTMLDivElement, ReactAspectProps>(function Aspect(
  { ratio, className, children, ...rest },
  ref,
) {
  const classes = aspectClasses({ ratio })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
