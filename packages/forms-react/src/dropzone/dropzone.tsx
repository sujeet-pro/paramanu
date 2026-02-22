import { forwardRef } from "react"
import { dropzoneClasses } from "@paramanu/forms-js"
import type { DropzoneProps } from "@paramanu/forms-js"

export interface ReactDropzoneProps extends DropzoneProps, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Dropzone = forwardRef<HTMLDivElement, ReactDropzoneProps>(function Dropzone(
  { disabled, dragging, className, children, ...rest },
  ref,
) {
  const classes = dropzoneClasses({ disabled, dragging })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={disabled ? undefined : 0}
      className={combinedClassName}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {children}
    </div>
  )
})
