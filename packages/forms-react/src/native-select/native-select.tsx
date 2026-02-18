import { forwardRef } from "react"
import { nativeSelectClasses } from "@paramanu/forms-js"
import type { NativeSelectProps } from "@paramanu/forms-js"

export interface ReactNativeSelectProps
  extends NativeSelectProps,
    Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  children?: React.ReactNode
}

export const NativeSelect = forwardRef<HTMLSelectElement, ReactNativeSelectProps>(
  function NativeSelect({ variant, size, disabled, invalid, fullWidth, className, children, ...rest }, ref) {
    const classes = nativeSelectClasses({ variant, size, disabled, invalid, fullWidth })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div className={combinedClassName}>
        <select
          ref={ref}
          className="pm-native-select__field"
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-disabled={disabled || undefined}
          {...rest}
        >
          {children}
        </select>
        <span className="pm-native-select__arrow" aria-hidden="true">
          &#9662;
        </span>
      </div>
    )
  },
)
