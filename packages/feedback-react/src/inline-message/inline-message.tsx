import { forwardRef } from "react"
import { inlineMsgClasses } from "@paramanu/feedback-js"
import type { InlineMsgClassesOptions } from "@paramanu/feedback-js"

export interface ReactInlineMsgProps
  extends InlineMsgClassesOptions, React.HTMLAttributes<HTMLDivElement> {
  /** Icon rendered before the content. */
  icon?: React.ReactNode
  children?: React.ReactNode
}

/**
 * InlineMsg displays compact feedback within forms or content areas.
 *
 * Uses `role="alert"` for warning/danger variants and `role="status"` for info/success.
 */
export const InlineMsg = forwardRef<HTMLDivElement, ReactInlineMsgProps>(function InlineMsg(
  { variant = "info", size, icon, className, children, ...rest },
  ref,
) {
  const classes = inlineMsgClasses({ variant, size })
  const combinedClassName = className ? `${classes.root} ${className}` : classes.root
  const role = variant === "warning" || variant === "danger" ? "alert" : "status"

  return (
    <div ref={ref} className={combinedClassName} role={role} {...rest}>
      {icon && <div className={classes.icon}>{icon}</div>}
      <div className={classes.content}>{children}</div>
    </div>
  )
})
