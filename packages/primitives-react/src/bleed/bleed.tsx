import { forwardRef } from "react"
import { bleedClasses } from "@paramanu/primitives-js"
import type { BleedProps } from "@paramanu/primitives-js"

export interface ReactBleedProps
  extends BleedProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children?: React.ReactNode
}

export const Bleed = forwardRef<HTMLDivElement, ReactBleedProps>(function Bleed(
  { inline, block, inlineStart, inlineEnd, blockStart, blockEnd, className, children, ...rest },
  ref,
) {
  const classes = bleedClasses({ inline, block, inlineStart, inlineEnd, blockStart, blockEnd })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
