import { forwardRef } from "react"
import { colorpickerClasses } from "@paramanu/forms-js"
import type { ColorpickerProps } from "@paramanu/forms-js"

export interface ReactColorpickerProps extends ColorpickerProps, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Colorpicker = forwardRef<HTMLDivElement, ReactColorpickerProps>(function Colorpicker(
  { size, disabled, open, className, children, ...rest },
  ref,
) {
  const classes = colorpickerClasses({ size, disabled, open })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      <button
        type="button"
        className="pm-colorpicker__trigger"
        aria-expanded={open || false}
        aria-haspopup="dialog"
        aria-disabled={disabled || undefined}
        disabled={disabled}
        aria-label="Select color"
      >
        <span className="pm-colorpicker__swatch" aria-hidden="true" />
      </button>
      <div className="pm-colorpicker__popover" role="dialog" aria-label="Color picker">
        {children}
      </div>
    </div>
  )
})
