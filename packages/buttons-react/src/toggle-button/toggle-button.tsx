import { forwardRef } from "react"
import { toggleButtonClasses } from "@paramanu/buttons-js"
import type { ToggleButtonProps } from "@paramanu/buttons-js"

export interface ReactToggleButtonProps
  extends ToggleButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  children?: React.ReactNode
}

export const ToggleButton = forwardRef<HTMLButtonElement, ReactToggleButtonProps>(
  function ToggleButton(
    { variant, size, pressed, disabled, className, children, ...rest },
    ref,
  ) {
    const classes = toggleButtonClasses({ variant, size, pressed, disabled })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <button
        ref={ref}
        type="button"
        className={combinedClassName}
        disabled={disabled}
        aria-disabled={disabled || undefined}
        aria-pressed={pressed ?? false}
        {...rest}
      >
        {children}
      </button>
    )
  },
)
