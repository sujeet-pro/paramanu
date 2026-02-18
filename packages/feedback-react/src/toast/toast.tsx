import { forwardRef, useEffect } from "react"
import { toastClasses, toastContainerClasses } from "@paramanu/feedback-js"
import type { ToastClassesOptions, ToastContainerClassesOptions } from "@paramanu/feedback-js"

export interface ReactToastProps
  extends ToastClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  /** Icon rendered before the content. */
  icon?: React.ReactNode
  /** Toast title rendered above the message. */
  title?: React.ReactNode
  /** Toast message body. */
  message?: React.ReactNode
  /** Callback invoked when the close button is clicked or duration expires. */
  onClose?: () => void
  /** Auto-dismiss duration in milliseconds. If `0` or not set, toast persists. */
  duration?: number
  children?: React.ReactNode
}

/**
 * Toast displays a brief, temporary notification.
 *
 * Uses `role="alert"` for warning/danger and `role="status"` otherwise.
 */
export const Toast = forwardRef<HTMLDivElement, ReactToastProps>(function Toast(
  {
    variant = "info",
    dismissible,
    entering,
    exiting,
    icon,
    title,
    message,
    onClose,
    duration,
    className,
    children,
    ...rest
  },
  ref,
) {
  const classes = toastClasses({ variant, dismissible, entering, exiting })
  const combinedClassName = className ? `${classes.root} ${className}` : classes.root
  const role = variant === "warning" || variant === "danger" ? "alert" : "status"

  useEffect(() => {
    if (!duration || !onClose) return
    const id = setTimeout(onClose, duration)
    return () => clearTimeout(id)
  }, [duration, onClose])

  return (
    <div ref={ref} className={combinedClassName} role={role} {...rest}>
      {icon && <div className={classes.icon}>{icon}</div>}
      <div className={classes.content}>
        {title && <div className={classes.title}>{title}</div>}
        {message && <div className={classes.message}>{message}</div>}
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

export interface ReactToastContainerProps
  extends ToastContainerClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

/**
 * Container for positioning toasts on screen.
 */
export const ToastContainer = forwardRef<HTMLDivElement, ReactToastContainerProps>(
  function ToastContainer({ placement, className, children, ...rest }, ref) {
    const classes = toastContainerClasses({ placement })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div ref={ref} className={combinedClassName} aria-live="polite" {...rest}>
        {children}
      </div>
    )
  },
)
