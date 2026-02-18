import { forwardRef } from "react"
import { wrapClasses } from "@paramanu/primitives-js"
import type { WrapProps } from "@paramanu/primitives-js"

export interface ReactWrapProps
  extends WrapProps,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Wrap = forwardRef<HTMLDivElement, ReactWrapProps>(function Wrap(
  { gap, align, justify, direction, className, children, ...rest },
  ref,
) {
  const classes = wrapClasses({ gap, align, justify, direction })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
