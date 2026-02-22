import { forwardRef } from "react"
import { uploadClasses } from "@paramanu/forms-js"
import type { UploadProps } from "@paramanu/forms-js"

export interface ReactUploadProps extends UploadProps, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Upload = forwardRef<HTMLDivElement, ReactUploadProps>(function Upload(
  { size, disabled, className, children, ...rest },
  ref,
) {
  const classes = uploadClasses({ size, disabled })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} aria-disabled={disabled || undefined} {...rest}>
      {children}
    </div>
  )
})
