import { forwardRef } from "react"
import { centerClasses } from "@paramanu/primitives-js"
import type { CenterProps } from "@paramanu/primitives-js"

export interface ReactCenterProps extends CenterProps, React.HTMLAttributes<HTMLDivElement> {
  /** Child elements. */
  children?: React.ReactNode
}

export const Center = forwardRef<HTMLDivElement, ReactCenterProps>(function Center(
  { inline, textCenter, className, children, ...rest },
  ref,
) {
  const classes = centerClasses({ inline, textCenter })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
