import { forwardRef, useEffect } from "react"
import { toastClasses, toastContainerClasses } from "@paramanu/feedback-js"
import type { ToastClassesOptions, ToastContainerClassesOptions } from "@paramanu/feedback-js"

export interface ReactToastProps
  extends ToastClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  message?: React.ReactNode
  onClose?: () => void
  duration?: number
}

export const Toast = forwardRef<HTMLDivElement, ReactToastProps>(function Toast(
  {
    variant = "info",
    dismissible,
    entering,
    exiting,
    icon,
    message,
    onClose,
    duration,
    className,
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
        {message && <div className={classes.message}>{message}</div>}
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

export const ToastContainer = forwardRef<HTMLDivElement, ReactToastContainerProps>(
  function ToastContainer({ placement, className, children, ...rest }, ref) {
    const classes = toastContainerClasses({ placement })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)
