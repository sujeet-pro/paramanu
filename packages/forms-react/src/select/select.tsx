import { forwardRef } from "react"
import { selectClasses } from "@paramanu/forms-js"
import type { SelectProps } from "@paramanu/forms-js"

export interface ReactSelectProps extends SelectProps, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  placeholder?: string
  value?: string
}

export const Select = forwardRef<HTMLDivElement, ReactSelectProps>(function Select(
  { variant, size, disabled, invalid, open, fullWidth, className, children, placeholder, ...rest },
  ref,
) {
  const classes = selectClasses({ variant, size, disabled, invalid, open, fullWidth })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      <button
        type="button"
        className="pm-select__trigger"
        role="combobox"
        aria-expanded={open || false}
        aria-haspopup="listbox"
        aria-invalid={invalid || undefined}
        aria-disabled={disabled || undefined}
        disabled={disabled}
      >
        {placeholder ?? "Select..."}
      </button>
      <div className="pm-select__listbox" role="listbox">
        {children}
      </div>
    </div>
  )
})
