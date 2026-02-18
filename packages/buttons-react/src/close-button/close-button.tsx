import { forwardRef } from "react"
import { closeButtonClasses } from "@paramanu/buttons-js"
import type { CloseButtonProps } from "@paramanu/buttons-js"

export interface ReactCloseButtonProps
  extends CloseButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  children?: React.ReactNode
}

export const CloseButton = forwardRef<HTMLButtonElement, ReactCloseButtonProps>(
  function CloseButton({ size, disabled, className, children, ...rest }, ref) {
    const classes = closeButtonClasses({ size, disabled })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <button
        ref={ref}
        type="button"
        className={combinedClassName}
        disabled={disabled}
        aria-disabled={disabled || undefined}
        aria-label={rest["aria-label"] ?? "Close"}
        {...rest}
      >
        {children ?? "\u00d7"}
      </button>
    )
  },
)
