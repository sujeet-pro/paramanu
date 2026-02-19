import { forwardRef } from "react"
import { scrollClasses } from "@paramanu/primitives-js"
import type { ScrollProps } from "@paramanu/primitives-js"

export interface ReactScrollProps
  extends ScrollProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Child elements. */
  children?: React.ReactNode
}

export const Scroll = forwardRef<HTMLDivElement, ReactScrollProps>(function Scroll(
  { direction, scrollbar, scrollbarSize, bordered, className, children, ...rest },
  ref,
) {
  const classes = scrollClasses({ direction, scrollbar, scrollbarSize, bordered })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} tabIndex={0} role="region" {...rest}>
      {children}
    </div>
  )
})
