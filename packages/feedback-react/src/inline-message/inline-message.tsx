import { forwardRef } from "react"
import { inlineMessageClasses } from "@paramanu/feedback-js"
import type { InlineMessageClassesOptions } from "@paramanu/feedback-js"

export interface ReactInlineMessageProps
  extends InlineMessageClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const InlineMessage = forwardRef<HTMLDivElement, ReactInlineMessageProps>(
  function InlineMessage({ variant = "info", className, children, ...rest }, ref) {
    const classes = inlineMessageClasses({ variant })
    const combinedClassName = className ? `${classes} ${className}` : classes
    const role = variant === "warning" || variant === "danger" ? "alert" : "status"

    return (
      <div ref={ref} className={combinedClassName} role={role} {...rest}>
        {children}
      </div>
    )
  },
)
