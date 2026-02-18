import { forwardRef } from "react"
import { simpleGridClasses } from "@paramanu/primitives-js"
import type { SimpleGridProps } from "@paramanu/primitives-js"

export interface ReactSimpleGridProps
  extends SimpleGridProps,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const SimpleGrid = forwardRef<HTMLDivElement, ReactSimpleGridProps>(function SimpleGrid(
  { minChildWidth, columns, gap, className, children, ...rest },
  ref,
) {
  const classes = simpleGridClasses({ minChildWidth, columns, gap })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
