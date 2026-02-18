import { forwardRef } from "react"
import { multiSelectClasses } from "@paramanu/forms-js"
import type { MultiSelectProps } from "@paramanu/forms-js"

export interface ReactMultiSelectProps extends MultiSelectProps, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  placeholder?: string
}

export const MultiSelect = forwardRef<HTMLDivElement, ReactMultiSelectProps>(function MultiSelect(
  { variant, size, disabled, invalid, open, fullWidth, className, children, placeholder, ...rest },
  ref,
) {
  const classes = multiSelectClasses({ variant, size, disabled, invalid, open, fullWidth })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      <div
        className="pm-multi-select__trigger"
        role="combobox"
        aria-expanded={open || false}
        aria-haspopup="listbox"
        aria-invalid={invalid || undefined}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
      >
        {placeholder && <span>{placeholder}</span>}
      </div>
      <div className="pm-multi-select__listbox" role="listbox" aria-multiselectable="true">
        {children}
      </div>
    </div>
  )
})
