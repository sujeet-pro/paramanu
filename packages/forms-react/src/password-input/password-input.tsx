import { forwardRef, useState } from "react"
import { pwdInputClasses, inputClasses } from "@paramanu/forms-js"
import type { PwdInputProps } from "@paramanu/forms-js"

export interface ReactPwdInputProps
  extends Omit<PwdInputProps, "onChange">,
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "type" | "value" | "defaultValue"
    > {
  children?: React.ReactNode
}

export const PwdInput = forwardRef<HTMLInputElement, ReactPwdInputProps>(
  function PwdInput(
    { variant, size, disabled, invalid, className, ...rest },
    ref,
  ) {
    const [visible, setVisible] = useState(false)

    const wrapperClasses = pwdInputClasses({ variant, size, invalid, disabled })
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
          className="pm-pwd-input__toggle"
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
