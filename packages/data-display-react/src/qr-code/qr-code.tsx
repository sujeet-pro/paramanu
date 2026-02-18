import { forwardRef } from "react"
import { qrCodeClasses } from "@paramanu/data-display-js"
import type { QrCodeProps } from "@paramanu/data-display-js"

export interface ReactQrCodeProps
  extends QrCodeProps,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const QrCode = forwardRef<HTMLDivElement, ReactQrCodeProps>(function QrCode(
  { size, className, children, ...rest },
  ref,
) {
  const classes = qrCodeClasses({ size })
  const combinedClassName = className ? `${classes.root} ${className}` : classes.root

  return (
    <div ref={ref} role="img" className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
