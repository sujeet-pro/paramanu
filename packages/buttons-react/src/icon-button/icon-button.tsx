import { forwardRef } from "react"
import { iconButtonClasses } from "@paramanu/buttons-js"
import type { IconButtonProps } from "@paramanu/buttons-js"

export interface ReactIconButtonProps
  extends IconButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type" | "aria-label"> {
  "aria-label": string
  children?: React.ReactNode
}

export const IconButton = forwardRef<HTMLButtonElement, ReactIconButtonProps>(
  function IconButton(
    { variant, size, shape, disabled, className, children, ...rest },
    ref,
  ) {
    const classes = iconButtonClasses({ variant, size, shape, disabled })
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
  },
)
