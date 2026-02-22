import { forwardRef } from "react"
import { spacerClasses } from "@paramanu/primitives-js"
import type { SpacerProps } from "@paramanu/primitives-js"

export interface ReactSpacerProps
  extends SpacerProps, Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Additional CSS class names. */
  className?: string
}

export const Spacer = forwardRef<HTMLDivElement, ReactSpacerProps>(function Spacer(
  { size, axis, className, ...rest },
  ref,
) {
  const classes = spacerClasses({ size, axis })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return <div ref={ref} className={combinedClassName} aria-hidden="true" {...rest} />
})
