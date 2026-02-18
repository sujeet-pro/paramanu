import { forwardRef } from "react"
import { proseClasses } from "@paramanu/typography-js"
import type { ProseClassesOptions } from "@paramanu/typography-js"

export interface ReactProseProps
  extends ProseClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Prose = forwardRef<HTMLDivElement, ReactProseProps>(function Prose(
  { size, className, children, ...rest },
  ref,
) {
  const classes = proseClasses({ size })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
