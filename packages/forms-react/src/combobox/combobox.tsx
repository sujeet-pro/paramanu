import { forwardRef } from "react"
import { comboboxClasses } from "@paramanu/forms-js"
import type { ComboboxProps } from "@paramanu/forms-js"

export interface ReactComboboxProps
  extends ComboboxProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  children?: React.ReactNode
}

export const Combobox = forwardRef<HTMLInputElement, ReactComboboxProps>(function Combobox(
  { variant, size, disabled, invalid, open, fullWidth, className, children, ...rest },
  ref,
) {
  const classes = comboboxClasses({ variant, size, disabled, invalid, open, fullWidth })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div className={combinedClassName}>
      <input
        ref={ref}
        className="pm-combobox__input"
        role="combobox"
        aria-expanded={open || false}
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-invalid={invalid || undefined}
        disabled={disabled}
        {...rest}
      />
      <div className="pm-combobox__listbox" role="listbox">
        {children}
      </div>
    </div>
  )
})
