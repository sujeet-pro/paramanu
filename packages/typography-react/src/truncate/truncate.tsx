import { forwardRef } from "react"
import { truncateClasses } from "@paramanu/typography-js"
import type { TruncateClassesOptions } from "@paramanu/typography-js"

export interface ReactTruncateProps
  extends TruncateClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Truncate = forwardRef<HTMLDivElement, ReactTruncateProps>(function Truncate(
  { lines, className, children, ...rest },
  ref,
) {
  const classes = truncateClasses({ lines })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
