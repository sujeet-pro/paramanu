import { forwardRef } from "react"
import { sgridClasses } from "@paramanu/primitives-js"
import type { SgridProps } from "@paramanu/primitives-js"

export interface ReactSgridProps extends SgridProps, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Sgrid = forwardRef<HTMLDivElement, ReactSgridProps>(function Sgrid(
  { minChildWidth, columns, gap, className, children, ...rest },
  ref,
) {
  const classes = sgridClasses({ minChildWidth, columns, gap })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
