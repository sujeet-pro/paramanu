import { forwardRef } from "react"
import { fabClasses } from "@paramanu/buttons-js"
import type { FabProps } from "@paramanu/buttons-js"

export interface ReactFabProps
  extends FabProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  children?: React.ReactNode
}

export const Fab = forwardRef<HTMLButtonElement, ReactFabProps>(function Fab(
  { size, position, extended, disabled, className, children, ...rest },
  ref,
) {
  const classes = fabClasses({ size, position, extended, disabled })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <button
      ref={ref}
      type="button"
      className={combinedClassName}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {children}
    </button>
  )
})
