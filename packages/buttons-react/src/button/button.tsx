import { forwardRef } from "react"
import { buttonClasses } from "@paramanu/buttons-js"
import type { ButtonProps } from "@paramanu/buttons-js"

export interface ReactButtonProps
  extends ButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  type?: "button" | "submit" | "reset"
  children?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ReactButtonProps>(function Button(
  { variant, size, disabled, fullWidth, type = "button", className, children, ...rest },
  ref,
) {
  const classes = buttonClasses({ variant, size, disabled, fullWidth })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <button
      ref={ref}
      type={type}
      className={combinedClassName}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {children}
    </button>
  )
})
