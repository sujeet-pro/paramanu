import { forwardRef, useEffect } from "react"
import {
  alertDialogClasses,
  alertDialogHeaderClasses,
  alertDialogBodyClasses,
  alertDialogFooterClasses,
} from "@paramanu/overlays-js"
import type { AlertDialogClassesOptions } from "@paramanu/overlays-js"

export interface ReactAlertDialogProps
  extends AlertDialogClassesOptions,
    Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
  open?: boolean
  onClose?: () => void
  closeOnEscape?: boolean
  children?: React.ReactNode
}

export const AlertDialog = forwardRef<HTMLDivElement, ReactAlertDialogProps>(
  function AlertDialog(
    { open = false, onClose, closeOnEscape = false, variant, className, children, ...rest },
    ref,
  ) {
    const classes = alertDialogClasses({ variant })
    const combinedClassName = className ? `${classes} ${className}` : classes

    useEffect(() => {
      if (!open || !closeOnEscape) return
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose?.()
      }
      document.addEventListener("keydown", handler)
      return () => document.removeEventListener("keydown", handler)
    }, [open, closeOnEscape, onClose])

    if (!open) return null

    return (
      <div ref={ref} role="alertdialog" aria-modal="true" className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactAlertDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const AlertDialogHeader = forwardRef<HTMLDivElement, ReactAlertDialogHeaderProps>(
  function AlertDialogHeader({ className, children, ...rest }, ref) {
    const classes = alertDialogHeaderClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactAlertDialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const AlertDialogBody = forwardRef<HTMLDivElement, ReactAlertDialogBodyProps>(
  function AlertDialogBody({ className, children, ...rest }, ref) {
    const classes = alertDialogBodyClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactAlertDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const AlertDialogFooter = forwardRef<HTMLDivElement, ReactAlertDialogFooterProps>(
  function AlertDialogFooter({ className, children, ...rest }, ref) {
    const classes = alertDialogFooterClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)
