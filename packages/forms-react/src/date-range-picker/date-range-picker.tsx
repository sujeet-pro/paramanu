import { forwardRef } from "react"
import { dateRangePickerClasses } from "@paramanu/forms-js"
import type { DateRangePickerProps } from "@paramanu/forms-js"

export interface ReactDateRangePickerProps
  extends DateRangePickerProps,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  placeholder?: string
}

export const DateRangePicker = forwardRef<HTMLDivElement, ReactDateRangePickerProps>(
  function DateRangePicker(
    { variant, size, disabled, invalid, open, className, children, placeholder, ...rest },
    ref,
  ) {
    const classes = dateRangePickerClasses({ variant, size, disabled, invalid, open })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        <button
          type="button"
          className="pm-date-range-picker__trigger"
          role="combobox"
          aria-expanded={open || false}
          aria-haspopup="dialog"
          aria-invalid={invalid || undefined}
          aria-disabled={disabled || undefined}
          disabled={disabled}
        >
          {placeholder ?? "Select date range"}
        </button>
        <div className="pm-date-range-picker__popover" role="dialog" aria-label="Date range calendar">
          <div className="pm-date-range-picker__panels">{children}</div>
        </div>
      </div>
    )
  },
)
