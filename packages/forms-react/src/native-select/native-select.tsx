import { forwardRef } from "react"
import { nativeSelClasses } from "@paramanu/forms-js"
import type { NativeSelProps } from "@paramanu/forms-js"

export interface ReactNativeSelProps
  extends NativeSelProps,
    Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  children?: React.ReactNode
}

export const NativeSel = forwardRef<HTMLSelectElement, ReactNativeSelProps>(
  function NativeSel({ variant, size, disabled, invalid, fullWidth, className, children, ...rest }, ref) {
    const classes = nativeSelClasses({ variant, size, disabled, invalid, fullWidth })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div className={combinedClassName}>
        <select
          ref={ref}
          className="pm-native-sel__field"
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-disabled={disabled || undefined}
          {...rest}
        >
          {children}
        </select>
        <span className="pm-native-sel__arrow" aria-hidden="true">
          &#9662;
        </span>
      </div>
    )
  },
)
