import { forwardRef } from "react"
import { segCtrlClasses } from "@paramanu/forms-js"
import type { SegCtrlProps } from "@paramanu/forms-js"

export interface ReactSegCtrlProps
  extends SegCtrlProps, Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
  children?: React.ReactNode
}

export const SegCtrl = forwardRef<HTMLDivElement, ReactSegCtrlProps>(function SegCtrl(
  { size, fullWidth, className, children, ...rest },
  ref,
) {
  const classes = segCtrlClasses({ size, fullWidth })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} role="radiogroup" className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
