import { forwardRef, createContext, useContext, useEffect, useId } from "react"
import {
  alertdialogClasses,
  alertDialogHeaderClasses,
  alertDialogBodyClasses,
  alertDialogFooterClasses,
} from "@paramanu/overlays-js"
import type { AlertdialogClassesOptions } from "@paramanu/overlays-js"

interface AlertdialogContextValue {
  onClose?: () => void
  titleId?: string
  descriptionId?: string
}

const AlertdialogContext = createContext<AlertdialogContextValue>({})

/** Returns the nearest Alertdialog context value. */
export const useAlertdialogContext = () => useContext(AlertdialogContext)

export interface ReactAlertdialogProps
  extends AlertdialogClassesOptions,
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
 * Alertdialog renders a modal that requires explicit user action to dismiss.
 * Unlike Dialog, it does not close on backdrop click.
 * Uses `role="alertdialog"` and `aria-modal="true"`.
 *
 * @example
 * ```tsx
 * <Alertdialog open={isOpen} onClose={close} variant="danger">
 *   <AlertdialogHeader>Delete Item?</AlertdialogHeader>
 *   <AlertdialogBody>This action cannot be undone.</AlertdialogBody>
 *   <AlertdialogFooter>
 *     <Btn variant="ghost" onClick={close}>Cancel</Btn>
 *     <Btn variant="danger" onClick={handleDelete}>Delete</Btn>
 *   </AlertdialogFooter>
 * </Alertdialog>
 * ```
 */
export const Alertdialog = forwardRef<HTMLDivElement, ReactAlertdialogProps>(
  function Alertdialog(
    { open = false, onClose, closeOnEscape = false, variant, className, children, ...rest },
    ref,
  ) {
    const uid = useId()
    const titleId = `pm-alertdialog-title-${uid}`
    const descriptionId = `pm-alertdialog-desc-${uid}`

    const classes = alertdialogClasses({ variant })
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
      <AlertdialogContext.Provider value={{ onClose, titleId, descriptionId }}>
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
      </AlertdialogContext.Provider>
    )
  },
)

export interface ReactAlertdialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const AlertdialogHeader = forwardRef<HTMLDivElement, ReactAlertdialogHeaderProps>(
  function AlertdialogHeader({ className, children, id, ...rest }, ref) {
    const ctx = useAlertdialogContext()
    const classes = alertDialogHeaderClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <div ref={ref} id={id ?? ctx.titleId} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactAlertdialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const AlertdialogBody = forwardRef<HTMLDivElement, ReactAlertdialogBodyProps>(
  function AlertdialogBody({ className, children, id, ...rest }, ref) {
    const ctx = useAlertdialogContext()
    const classes = alertDialogBodyClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <div ref={ref} id={id ?? ctx.descriptionId} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactAlertdialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const AlertdialogFooter = forwardRef<HTMLDivElement, ReactAlertdialogFooterProps>(
  function AlertdialogFooter({ className, children, ...rest }, ref) {
    const classes = alertDialogFooterClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)
