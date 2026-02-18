import { forwardRef } from "react"
import { notificationClasses } from "@paramanu/feedback-js"
import type { NotificationClassesOptions } from "@paramanu/feedback-js"

export interface ReactNotificationProps
  extends NotificationClassesOptions,
    Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode
  title?: React.ReactNode
  message?: React.ReactNode
  timestamp?: React.ReactNode
  actions?: React.ReactNode
  onClose?: () => void
}

export const Notification = forwardRef<HTMLDivElement, ReactNotificationProps>(
  function Notification(
    { unread, dismissible, icon, title, message, timestamp, actions, onClose, className, ...rest },
    ref,
  ) {
    const classes = notificationClasses({ unread, dismissible })
    const combinedClassName = className ? `${classes.root} ${className}` : classes.root

    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {icon && <div className={classes.icon}>{icon}</div>}
        <div className={classes.content}>
          {title && <div className={classes.title}>{title}</div>}
          {message && <div className={classes.message}>{message}</div>}
          {timestamp && <div className={classes.timestamp}>{timestamp}</div>}
          {actions && <div className={classes.actions}>{actions}</div>}
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
  },
)
