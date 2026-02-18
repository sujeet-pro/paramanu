import { forwardRef } from "react"
import { segmentedControlClasses } from "@paramanu/forms-js"
import type { SegmentedControlProps } from "@paramanu/forms-js"

export interface ReactSegmentedControlProps
  extends SegmentedControlProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
  children?: React.ReactNode
}

export const SegmentedControl = forwardRef<HTMLDivElement, ReactSegmentedControlProps>(
  function SegmentedControl({ size, fullWidth, className, children, ...rest }, ref) {
    const classes = segmentedControlClasses({ size, fullWidth })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div ref={ref} role="radiogroup" className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)
