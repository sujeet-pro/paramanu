import { forwardRef } from "react"
import { notifClasses } from "@paramanu/feedback-js"
import type { NotifClassesOptions } from "@paramanu/feedback-js"

export interface ReactNotifProps
  extends NotifClassesOptions,
    Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Avatar or icon element. */
  icon?: React.ReactNode
  /** Notif title. */
  title?: React.ReactNode
  /** Notif body message. */
  message?: React.ReactNode
  /** Timestamp string (e.g. "2 min ago"). */
  timestamp?: React.ReactNode
  /** Action buttons or links. */
  actions?: React.ReactNode
  /** Callback invoked when the close button is clicked. */
  onClose?: () => void
  children?: React.ReactNode
}

/**
 * Notif displays a rich notification with title, description, timestamp, and actions.
 */
export const Notif = forwardRef<HTMLDivElement, ReactNotifProps>(
  function Notif(
    {
      variant,
      unread,
      dismissible,
      icon,
      title,
      message,
      timestamp,
      actions,
      onClose,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const classes = notifClasses({ variant, unread, dismissible })
    const combinedClassName = className ? `${classes.root} ${className}` : classes.root

    return (
      <div ref={ref} className={combinedClassName} role="article" {...rest}>
        {icon && <div className={classes.icon}>{icon}</div>}
        <div className={classes.content}>
          {title && <div className={classes.title}>{title}</div>}
          {message && <div className={classes.message}>{message}</div>}
          {timestamp && (
            <time className={classes.timestamp}>{timestamp}</time>
          )}
          {actions && <div className={classes.actions}>{actions}</div>}
          {children}
        </div>
        {dismissible && onClose && (
          <button
            className={classes.close}
            onClick={onClose}
            aria-label="Dismiss notification"
            type="button"
          >
            {"\u00d7"}
          </button>
        )}
      </div>
    )
  },
)
