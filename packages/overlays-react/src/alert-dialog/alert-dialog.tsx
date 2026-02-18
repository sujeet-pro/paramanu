import { forwardRef, createContext, useContext, useEffect, useId } from "react"
import {
  alertDialogClasses,
  alertDialogHeaderClasses,
  alertDialogBodyClasses,
  alertDialogFooterClasses,
} from "@paramanu/overlays-js"
import type { AlertDialogClassesOptions } from "@paramanu/overlays-js"

interface AlertDialogContextValue {
  onClose?: () => void
  titleId?: string
  descriptionId?: string
}

const AlertDialogContext = createContext<AlertDialogContextValue>({})

/** Returns the nearest AlertDialog context value. */
export const useAlertDialogContext = () => useContext(AlertDialogContext)

export interface ReactAlertDialogProps
  extends AlertDialogClassesOptions,
    Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
  /** Whether the alert dialog is open. @default false */
  open?: boolean
  /** Callback invoked when the alert dialog is closed. */
  onClose?: () => void
  /** Whether pressing Escape closes the alert dialog. @default false */
  closeOnEscape?: boolean
  /** Accessible label for the dialog. Used when no visible title is present. */
  "aria-label"?: string
  children?: React.ReactNode
}

/**
 * AlertDialog renders a modal that requires explicit user action to dismiss.
 * Unlike Dialog, it does not close on backdrop click.
 * Uses `role="alertdialog"` and `aria-modal="true"`.
 *
 * @example
 * ```tsx
 * <AlertDialog open={isOpen} onClose={close} variant="danger">
 *   <AlertDialogHeader>Delete Item?</AlertDialogHeader>
 *   <AlertDialogBody>This action cannot be undone.</AlertDialogBody>
 *   <AlertDialogFooter>
 *     <Button variant="ghost" onClick={close}>Cancel</Button>
 *     <Button variant="danger" onClick={handleDelete}>Delete</Button>
 *   </AlertDialogFooter>
 * </AlertDialog>
 * ```
 */
export const AlertDialog = forwardRef<HTMLDivElement, ReactAlertDialogProps>(
  function AlertDialog(
    { open = false, onClose, closeOnEscape = false, variant, className, children, ...rest },
    ref,
  ) {
    const uid = useId()
    const titleId = `pm-alert-dialog-title-${uid}`
    const descriptionId = `pm-alert-dialog-desc-${uid}`

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
      <AlertDialogContext.Provider value={{ onClose, titleId, descriptionId }}>
        <div
          ref={ref}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby={rest["aria-label"] ? undefined : titleId}
          aria-describedby={descriptionId}
          className={combinedClassName}
          {...rest}
        >
          {children}
        </div>
      </AlertDialogContext.Provider>
    )
  },
)

export interface ReactAlertDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const AlertDialogHeader = forwardRef<HTMLDivElement, ReactAlertDialogHeaderProps>(
  function AlertDialogHeader({ className, children, id, ...rest }, ref) {
    const ctx = useAlertDialogContext()
    const classes = alertDialogHeaderClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <div ref={ref} id={id ?? ctx.titleId} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactAlertDialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const AlertDialogBody = forwardRef<HTMLDivElement, ReactAlertDialogBodyProps>(
  function AlertDialogBody({ className, children, id, ...rest }, ref) {
    const ctx = useAlertDialogContext()
    const classes = alertDialogBodyClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <div ref={ref} id={id ?? ctx.descriptionId} className={combinedClassName} {...rest}>
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
