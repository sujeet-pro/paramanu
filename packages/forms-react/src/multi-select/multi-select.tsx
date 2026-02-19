import { forwardRef } from "react"
import { multiSelClasses } from "@paramanu/forms-js"
import type { MultiSelProps } from "@paramanu/forms-js"

export interface ReactMultiSelProps extends MultiSelProps, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  placeholder?: string
}

export const MultiSel = forwardRef<HTMLDivElement, ReactMultiSelProps>(function MultiSel(
  { variant, size, disabled, invalid, open, fullWidth, className, children, placeholder, ...rest },
  ref,
) {
  const classes = multiSelClasses({ variant, size, disabled, invalid, open, fullWidth })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      <div
        className="pm-multi-sel__trigger"
        role="combobox"
        aria-expanded={open || false}
        aria-haspopup="listbox"
        aria-invalid={invalid || undefined}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
      >
        {placeholder && <span>{placeholder}</span>}
      </div>
      <div className="pm-multi-sel__listbox" role="listbox" aria-multiselectable="true">
        {children}
      </div>
    </div>
  )
})
