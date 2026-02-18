import { forwardRef } from "react"
import { timePickerClasses } from "@paramanu/forms-js"
import type { TimePickerProps } from "@paramanu/forms-js"

export interface ReactTimePickerProps
  extends TimePickerProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  children?: React.ReactNode
}

export const TimePicker = forwardRef<HTMLInputElement, ReactTimePickerProps>(function TimePicker(
  { variant, size, disabled, invalid, open, className, children, ...rest },
  ref,
) {
  const classes = timePickerClasses({ variant, size, disabled, invalid, open })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div className={combinedClassName}>
      <input
        ref={ref}
        type="text"
        className="pm-time-picker__input"
        role="combobox"
        aria-expanded={open || false}
        aria-haspopup="listbox"
        aria-invalid={invalid || undefined}
        disabled={disabled}
        {...rest}
      />
      <div className="pm-time-picker__dropdown" role="listbox">
        {children}
      </div>
    </div>
  )
})
