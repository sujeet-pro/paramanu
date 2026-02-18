import { forwardRef } from "react"
import { aspectRatioClasses } from "@paramanu/primitives-js"
import type { AspectRatioProps } from "@paramanu/primitives-js"

export interface ReactAspectRatioProps
  extends AspectRatioProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children?: React.ReactNode
}

export const AspectRatio = forwardRef<HTMLDivElement, ReactAspectRatioProps>(function AspectRatio(
  { ratio, className, children, ...rest },
  ref,
) {
  const classes = aspectRatioClasses({ ratio })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
