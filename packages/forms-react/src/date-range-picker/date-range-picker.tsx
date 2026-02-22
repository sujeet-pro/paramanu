import { forwardRef } from "react"
import { daterangeClasses } from "@paramanu/forms-js"
import type { DaterangeProps } from "@paramanu/forms-js"

export interface ReactDaterangeProps extends DaterangeProps, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  placeholder?: string
}

export const Daterange = forwardRef<HTMLDivElement, ReactDaterangeProps>(function Daterange(
  { variant, size, disabled, invalid, open, className, children, placeholder, ...rest },
  ref,
) {
  const classes = daterangeClasses({ variant, size, disabled, invalid, open })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      <button
        type="button"
        className="pm-daterange__trigger"
        role="combobox"
        aria-expanded={open || false}
        aria-haspopup="dialog"
        aria-invalid={invalid || undefined}
        aria-disabled={disabled || undefined}
        disabled={disabled}
      >
        {placeholder ?? "Select date range"}
      </button>
      <div className="pm-daterange__popover" role="dialog" aria-label="Date range calendar">
        <div className="pm-daterange__panels">{children}</div>
      </div>
    </div>
  )
})
