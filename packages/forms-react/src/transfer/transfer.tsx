import { forwardRef } from "react"
import { transferClasses } from "@paramanu/forms-js"
import type { TransferProps } from "@paramanu/forms-js"

export interface ReactTransferProps extends TransferProps, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Transfer = forwardRef<HTMLDivElement, ReactTransferProps>(function Transfer(
  { size, disabled, className, children, ...rest },
  ref,
) {
  const classes = transferClasses({ size, disabled })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div
      ref={ref}
      role="group"
      className={combinedClassName}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {children}
    </div>
  )
})
