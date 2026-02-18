import { forwardRef } from "react"
import { masonryClasses } from "@paramanu/primitives-js"
import type { MasonryProps } from "@paramanu/primitives-js"

export interface ReactMasonryProps
  extends MasonryProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children?: React.ReactNode
}

export const Masonry = forwardRef<HTMLDivElement, ReactMasonryProps>(function Masonry(
  { columns, gap, className, children, ...rest },
  ref,
) {
  const classes = masonryClasses({ columns, gap })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
