import { forwardRef } from "react"
import { scrollAreaClasses } from "@paramanu/primitives-js"
import type { ScrollAreaProps } from "@paramanu/primitives-js"

export interface ReactScrollAreaProps
  extends ScrollAreaProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Child elements. */
  children?: React.ReactNode
}

export const ScrollArea = forwardRef<HTMLDivElement, ReactScrollAreaProps>(function ScrollArea(
  { direction, scrollbar, scrollbarSize, bordered, className, children, ...rest },
  ref,
) {
  const classes = scrollAreaClasses({ direction, scrollbar, scrollbarSize, bordered })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} tabIndex={0} role="region" {...rest}>
      {children}
    </div>
  )
})
