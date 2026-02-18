import { forwardRef } from "react"
import { loadingOverlayClasses } from "@paramanu/feedback-js"
import type { LoadingOverlayClassesOptions } from "@paramanu/feedback-js"

export interface ReactLoadingOverlayProps
  extends LoadingOverlayClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const LoadingOverlay = forwardRef<HTMLDivElement, ReactLoadingOverlayProps>(
  function LoadingOverlay({ visible, blur, className, children, ...rest }, ref) {
    const classes = loadingOverlayClasses({ visible, blur })
    const combinedClassName = className ? `${classes.root} ${className}` : classes.root

    return (
      <div ref={ref} className={combinedClassName} aria-hidden={!visible} {...rest}>
        <div className={classes.backdrop} />
        <div className={classes.content}>{children}</div>
      </div>
    )
  },
)
