import { forwardRef } from "react"
import { flexClasses } from "@paramanu/primitives-js"
import type { FlexProps } from "@paramanu/primitives-js"

export interface ReactFlexProps
  extends FlexProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "wrap"> {
  children?: React.ReactNode
}

export const Flex = forwardRef<HTMLDivElement, ReactFlexProps>(function Flex(
  { direction, align, justify, wrap, gap, inline, className, children, ...rest },
  ref,
) {
  const classes = flexClasses({ direction, align, justify, wrap, gap, inline })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
