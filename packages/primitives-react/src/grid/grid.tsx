import { forwardRef } from "react"
import { gridClasses } from "@paramanu/primitives-js"
import type { GridProps } from "@paramanu/primitives-js"

export interface ReactGridProps
  extends GridProps,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Grid = forwardRef<HTMLDivElement, ReactGridProps>(function Grid(
  { columns, rows, gap, rowGap, columnGap, align, justify, inline, className, children, ...rest },
  ref,
) {
  const classes = gridClasses({ columns, rows, gap, rowGap, columnGap, align, justify, inline })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
