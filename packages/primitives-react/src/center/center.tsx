import { forwardRef } from "react"
import { centerClasses } from "@paramanu/primitives-js"
import type { CenterProps } from "@paramanu/primitives-js"

export interface ReactCenterProps
  extends CenterProps,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Center = forwardRef<HTMLDivElement, ReactCenterProps>(function Center(
  { inline, className, children, ...rest },
  ref,
) {
  const classes = centerClasses({ inline })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
