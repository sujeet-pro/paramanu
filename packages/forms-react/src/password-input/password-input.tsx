import { forwardRef, useState } from "react"
import { passwordInputClasses, inputClasses } from "@paramanu/forms-js"
import type { PasswordInputProps } from "@paramanu/forms-js"

export interface ReactPasswordInputProps
  extends PasswordInputProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  children?: React.ReactNode
}

export const PasswordInput = forwardRef<HTMLInputElement, ReactPasswordInputProps>(
  function PasswordInput(
    { variant, size, disabled, invalid, className, ...rest },
    ref,
  ) {
    const [visible, setVisible] = useState(false)

    const wrapperClasses = passwordInputClasses({ variant, size, invalid, disabled })
    const innerClasses = inputClasses({ variant, size, invalid, disabled })
    const combinedWrapperClassName = className ? `${wrapperClasses} ${className}` : wrapperClasses

    return (
      <div className={combinedWrapperClassName}>
        <input
          ref={ref}
          type={visible ? "text" : "password"}
          className={innerClasses}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-disabled={disabled || undefined}
          {...rest}
        />
        <button
          type="button"
          className="pm-password-input__toggle"
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((v) => !v)}
          disabled={disabled}
          tabIndex={-1}
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
    )
  },
)
