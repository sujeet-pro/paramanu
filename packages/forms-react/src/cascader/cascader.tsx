import { forwardRef } from "react"
import { cascaderClasses } from "@paramanu/forms-js"
import type { CascaderProps } from "@paramanu/forms-js"

export interface ReactCascaderProps extends CascaderProps, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  placeholder?: string
}

export const Cascader = forwardRef<HTMLDivElement, ReactCascaderProps>(function Cascader(
  { variant, size, disabled, invalid, open, fullWidth, className, children, placeholder, ...rest },
  ref,
) {
  const classes = cascaderClasses({ variant, size, disabled, invalid, open, fullWidth })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      <button
        type="button"
        className="pm-cascader__trigger"
        role="combobox"
        aria-expanded={open || false}
        aria-haspopup="listbox"
        aria-invalid={invalid || undefined}
        aria-disabled={disabled || undefined}
        disabled={disabled}
      >
        {placeholder ?? "Select..."}
      </button>
      <div className="pm-cascader__dropdown">{children}</div>
    </div>
  )
})
