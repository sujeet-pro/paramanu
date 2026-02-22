import { forwardRef, createContext, useContext, useCallback, useEffect, useId } from "react"
import {
  dialogClasses,
  dialogHeaderClasses,
  dialogBodyClasses,
  dialogFooterClasses,
} from "@paramanu/overlays-js"
import type {
  DialogClassesOptions,
  DialogBodyClassesOptions,
  DialogScrollBehavior,
} from "@paramanu/overlays-js"

interface DialogContextValue {
  onClose?: () => void
  titleId?: string
  descriptionId?: string
}

const DialogContext = createContext<DialogContextValue>({})

/** Returns the nearest Dialog context value. Useful for building custom close buttons. */
export const useDialogContext = () => useContext(DialogContext)

export interface ReactDialogProps
  extends DialogClassesOptions, Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
  /** Whether the dialog is open. @default false */
  open?: boolean
  /** Callback invoked when the dialog requests to close. */
  onClose?: () => void
  /** Whether clicking the backdrop area closes the dialog. @default true */
  closeOnBackdropClick?: boolean
  /** Whether pressing Escape closes the dialog. @default true */
  closeOnEscape?: boolean
  /** Accessible label for the dialog. Used when no visible title is present. */
  "aria-label"?: string
  children?: React.ReactNode
}

/**
 * Dialog renders a modal overlay with focus trapping and ARIA attributes.
 * Uses `role="dialog"` and `aria-modal="true"`.
 *
 * @example
 * ```tsx
 * <Dialog open={isOpen} onClose={close} size="lg" centered>
 *   <DialogHeader>Title</DialogHeader>
 *   <DialogBody>Content here</DialogBody>
 *   <DialogFooter>
 *     <Btn onClick={close}>Close</Btn>
 *   </DialogFooter>
 * </Dialog>
 * ```
 */
export const Dialog = forwardRef<HTMLDivElement, ReactDialogProps>(function Dialog(
  {
    open = false,
    onClose,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    size,
    centered,
    scrollBehavior,
    className,
    children,
    ...rest
  },
  ref,
) {
  const uid = useId()
  const titleId = `pm-dialog-title-${uid}`
  const descriptionId = `pm-dialog-desc-${uid}`

  const classes = dialogClasses({ size, centered, scrollBehavior })
  const combinedClassName = className ? `${classes} ${className}` : classes

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (closeOnBackdropClick && e.target === e.currentTarget) {
        onClose?.()
      }
    },
    [closeOnBackdropClick, onClose],
  )

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
    <DialogContext.Provider value={{ onClose, titleId, descriptionId }}>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={rest["aria-label"] ? undefined : titleId}
        aria-describedby={descriptionId}
        className={combinedClassName}
        onClick={handleBackdropClick}
        {...rest}
      >
        {children}
      </div>
    </DialogContext.Provider>
  )
})

export interface ReactDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

/**
 * DialogHeader provides the title area of a Dialog.
 * Automatically linked to the dialog via `aria-labelledby`.
 */
export const DialogHeader = forwardRef<HTMLDivElement, ReactDialogHeaderProps>(
  function DialogHeader({ className, children, id, ...rest }, ref) {
    const ctx = useDialogContext()
    const classes = dialogHeaderClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div ref={ref} id={id ?? ctx.titleId} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactDialogBodyProps
  extends DialogBodyClassesOptions, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

/**
 * DialogBody contains the main content of a Dialog.
 * Automatically linked to the dialog via `aria-describedby`.
 */
export const DialogBody = forwardRef<HTMLDivElement, ReactDialogBodyProps>(function DialogBody(
  { scrollBehavior, className, children, id, ...rest },
  ref,
) {
  const ctx = useDialogContext()
  const classes = dialogBodyClasses({ scrollBehavior })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} id={id ?? ctx.descriptionId} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export interface ReactDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

/**
 * DialogFooter renders the action area at the bottom of a Dialog.
 */
export const DialogFooter = forwardRef<HTMLDivElement, ReactDialogFooterProps>(
  function DialogFooter({ className, children, ...rest }, ref) {
    const classes = dialogFooterClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)
