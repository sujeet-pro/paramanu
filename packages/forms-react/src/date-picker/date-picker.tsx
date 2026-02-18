import { forwardRef } from "react"
import { datePickerClasses } from "@paramanu/forms-js"
import type { DatePickerProps } from "@paramanu/forms-js"

export interface ReactDatePickerProps
  extends DatePickerProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  children?: React.ReactNode
}

export const DatePicker = forwardRef<HTMLInputElement, ReactDatePickerProps>(function DatePicker(
  { variant, size, disabled, invalid, open, className, children, ...rest },
  ref,
) {
  const classes = datePickerClasses({ variant, size, disabled, invalid, open })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div className={combinedClassName}>
      <input
        ref={ref}
        type="text"
        className="pm-date-picker__input"
        role="combobox"
        aria-expanded={open || false}
        aria-haspopup="dialog"
        aria-invalid={invalid || undefined}
        disabled={disabled}
        {...rest}
      />
      <span className="pm-date-picker__icon" aria-hidden="true">
        &#128197;
      </span>
      <div className="pm-date-picker__popover" role="dialog" aria-label="Calendar">
        {children}
      </div>
    </div>
  )
})
