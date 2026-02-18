import { forwardRef } from "react"
import { spacerClasses } from "@paramanu/primitives-js"
import type { SpacerProps } from "@paramanu/primitives-js"

export interface ReactSpacerProps
  extends SpacerProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  className?: string
}

export const Spacer = forwardRef<HTMLDivElement, ReactSpacerProps>(function Spacer(
  { className, ...rest },
  ref,
) {
  const classes = spacerClasses()
  const combinedClassName = className ? `${classes} ${className}` : classes

  return <div ref={ref} className={combinedClassName} aria-hidden="true" {...rest} />
})
