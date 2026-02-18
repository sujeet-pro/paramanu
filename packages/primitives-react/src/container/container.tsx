import { forwardRef } from "react"
import { containerClasses } from "@paramanu/primitives-js"
import type { ContainerProps } from "@paramanu/primitives-js"

export interface ReactContainerProps
  extends ContainerProps,
    React.HTMLAttributes<HTMLDivElement> {
  /** Child elements. */
  children?: React.ReactNode
}

export const Container = forwardRef<HTMLDivElement, ReactContainerProps>(function Container(
  { size, fluid, px, center, className, children, ...rest },
  ref,
) {
  const classes = containerClasses({ size, fluid, px, center })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
