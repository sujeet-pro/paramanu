import { forwardRef } from "react"
import { backdropClasses } from "@paramanu/overlays-js"
import type { BackdropClassesOptions } from "@paramanu/overlays-js"

export interface ReactBackdropProps
  extends BackdropClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Backdrop = forwardRef<HTMLDivElement, ReactBackdropProps>(function Backdrop(
  { variant, visible, className, children, ...rest },
  ref,
) {
  const classes = backdropClasses({ variant, visible })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} aria-hidden="true" {...rest}>
      {children}
    </div>
  )
})
