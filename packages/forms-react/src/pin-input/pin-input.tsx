import { forwardRef } from "react"
import { pinInputClasses } from "@paramanu/forms-js"
import type { PinInputProps } from "@paramanu/forms-js"

export interface ReactPinInputProps extends PinInputProps, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const PinInput = forwardRef<HTMLDivElement, ReactPinInputProps>(function PinInput(
  { size, disabled, invalid, length, className, children, ...rest },
  ref,
) {
  const classes = pinInputClasses({ size, disabled, invalid })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div
      ref={ref}
      role="group"
      className={combinedClassName}
      aria-disabled={disabled || undefined}
      aria-invalid={invalid || undefined}
      {...rest}
    >
      {children}
    </div>
  )
})
