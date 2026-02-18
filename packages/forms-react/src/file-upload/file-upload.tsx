import { forwardRef } from "react"
import { fileUploadClasses } from "@paramanu/forms-js"
import type { FileUploadProps } from "@paramanu/forms-js"

export interface ReactFileUploadProps
  extends FileUploadProps,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const FileUpload = forwardRef<HTMLDivElement, ReactFileUploadProps>(function FileUpload(
  { size, disabled, className, children, ...rest },
  ref,
) {
  const classes = fileUploadClasses({ size, disabled })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div
      ref={ref}
      className={combinedClassName}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {children}
    </div>
  )
})
