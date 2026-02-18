import { forwardRef } from "react"
import { inlineMessageClasses } from "@paramanu/feedback-js"
import type { InlineMessageClassesOptions } from "@paramanu/feedback-js"

export interface ReactInlineMessageProps
  extends InlineMessageClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  /** Icon rendered before the content. */
  icon?: React.ReactNode
  children?: React.ReactNode
}

/**
 * InlineMessage displays compact feedback within forms or content areas.
 *
 * Uses `role="alert"` for warning/danger variants and `role="status"` for info/success.
 */
export const InlineMessage = forwardRef<HTMLDivElement, ReactInlineMessageProps>(
  function InlineMessage({ variant = "info", size, icon, className, children, ...rest }, ref) {
    const classes = inlineMessageClasses({ variant, size })
    const combinedClassName = className ? `${classes.root} ${className}` : classes.root
    const role = variant === "warning" || variant === "danger" ? "alert" : "status"

    return (
      <div ref={ref} className={combinedClassName} role={role} {...rest}>
        {icon && <div className={classes.icon}>{icon}</div>}
        <div className={classes.content}>{children}</div>
      </div>
    )
  },
)
