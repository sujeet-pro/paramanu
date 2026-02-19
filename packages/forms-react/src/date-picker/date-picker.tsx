import { forwardRef } from "react"
import { datepickerClasses } from "@paramanu/forms-js"
import type { DatepickerProps } from "@paramanu/forms-js"

export interface ReactDatepickerProps
  extends DatepickerProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  children?: React.ReactNode
}

export const Datepicker = forwardRef<HTMLInputElement, ReactDatepickerProps>(function Datepicker(
  { variant, size, disabled, invalid, open, className, children, ...rest },
  ref,
) {
  const classes = datepickerClasses({ variant, size, disabled, invalid, open })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div className={combinedClassName}>
      <input
        ref={ref}
        type="text"
        className="pm-datepicker__input"
        role="combobox"
        aria-expanded={open || false}
        aria-haspopup="dialog"
        aria-invalid={invalid || undefined}
        disabled={disabled}
        {...rest}
      />
      <span className="pm-datepicker__icon" aria-hidden="true">
        &#128197;
      </span>
      <div className="pm-datepicker__popover" role="dialog" aria-label="Calendar">
        {children}
      </div>
    </div>
  )
})
