import { forwardRef } from "react"
import { colorPickerClasses } from "@paramanu/forms-js"
import type { ColorPickerProps } from "@paramanu/forms-js"

export interface ReactColorPickerProps extends ColorPickerProps, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const ColorPicker = forwardRef<HTMLDivElement, ReactColorPickerProps>(function ColorPicker(
  { size, disabled, open, className, children, ...rest },
  ref,
) {
  const classes = colorPickerClasses({ size, disabled, open })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      <button
        type="button"
        className="pm-color-picker__trigger"
        aria-expanded={open || false}
        aria-haspopup="dialog"
        aria-disabled={disabled || undefined}
        disabled={disabled}
        aria-label="Select color"
      >
        <span className="pm-color-picker__swatch" aria-hidden="true" />
      </button>
      <div className="pm-color-picker__popover" role="dialog" aria-label="Color picker">
        {children}
      </div>
    </div>
  )
})
