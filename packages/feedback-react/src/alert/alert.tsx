import { forwardRef } from "react"
import { alertClasses } from "@paramanu/feedback-js"
import type { AlertClassesOptions } from "@paramanu/feedback-js"

export interface ReactAlertProps
  extends AlertClassesOptions,
    Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  onClose?: () => void
  children?: React.ReactNode
}

export const Alert = forwardRef<HTMLDivElement, ReactAlertProps>(function Alert(
  { variant = "info", dismissible, icon, title, description, onClose, className, children, ...rest },
  ref,
) {
  const classes = alertClasses({ variant, dismissible })
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
        <button
          className={classes.close}
          onClick={onClose}
          aria-label="Close"
          type="button"
        >
          {"\u00d7"}
        </button>
      )}
    </div>
  )
})
