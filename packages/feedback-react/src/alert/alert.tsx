import { forwardRef } from "react"
import { alertClasses } from "@paramanu/feedback-js"
import type { AlertClassesOptions } from "@paramanu/feedback-js"

export interface ReactAlertProps
  extends AlertClassesOptions, Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Icon rendered before the content. */
  icon?: React.ReactNode
  /** Alert title rendered above the description. */
  title?: React.ReactNode
  /** Alert description / body text. */
  description?: React.ReactNode
  /** Callback invoked when the close button is clicked. */
  onClose?: () => void
  children?: React.ReactNode
}

/**
 * Alert displays a prominent feedback message to the user.
 *
 * Uses `role="alert"` for warning/danger variants and `role="status"` for info/success.
 */
export const Alert = forwardRef<HTMLDivElement, ReactAlertProps>(function Alert(
  {
    variant = "info",
    alertStyle,
    dismissible,
    icon,
    title,
    description,
    onClose,
    className,
    children,
    ...rest
  },
  ref,
) {
  const classes = alertClasses({ variant, alertStyle, dismissible })
  const combinedClassName = className ? `${classes.root} ${className}` : classes.root
  const role = variant === "warning" || variant === "danger" ? "alert" : "status"

  return (
    <div ref={ref} className={combinedClassName} role={role} {...rest}>
      {icon && <div className={classes.icon}>{icon}</div>}
      <div className={classes.content}>
        {title && <div className={classes.title}>{title}</div>}
        {description && <div className={classes.description}>{description}</div>}
        {children}
      </div>
      {dismissible && onClose && (
        <button className={classes.close} onClick={onClose} aria-label="Close" type="button">
          {"\u00d7"}
        </button>
      )}
    </div>
  )
})
