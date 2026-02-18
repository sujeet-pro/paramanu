import { forwardRef } from "react"
import { clipboardClasses } from "@paramanu/data-display-js"
import type { ClipboardProps } from "@paramanu/data-display-js"

export interface ReactClipboardProps
  extends ClipboardProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  children?: React.ReactNode
}

export const Clipboard = forwardRef<HTMLButtonElement, ReactClipboardProps>(function Clipboard(
  { size, copied, type = "button", className, children, ...rest },
  ref,
) {
  const classes = clipboardClasses({ size, copied })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <button
      ref={ref}
      type={type}
      className={combinedClassName}
      aria-label="Copy to clipboard"
      {...rest}
    >
      {children}
    </button>
  )
})
