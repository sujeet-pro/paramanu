import { forwardRef, createContext, useContext, useCallback, useEffect } from "react"
import {
  dialogClasses,
  dialogHeaderClasses,
  dialogBodyClasses,
  dialogFooterClasses,
} from "@paramanu/overlays-js"
import type { DialogClassesOptions, DialogBodyClassesOptions } from "@paramanu/overlays-js"

interface DialogContextValue {
  onClose?: () => void
}

const DialogContext = createContext<DialogContextValue>({})

export const useDialogContext = () => useContext(DialogContext)

export interface ReactDialogProps
  extends DialogClassesOptions,
    Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
  open?: boolean
  onClose?: () => void
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
  children?: React.ReactNode
}

export const Dialog = forwardRef<HTMLDivElement, ReactDialogProps>(function Dialog(
  {
    open = false,
    onClose,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    size,
    centered,
    className,
    children,
    ...rest
  },
  ref,
) {
  const classes = dialogClasses({ size, centered })
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
    <DialogContext.Provider value={{ onClose }}>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
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

export const DialogHeader = forwardRef<HTMLDivElement, ReactDialogHeaderProps>(
  function DialogHeader({ className, children, ...rest }, ref) {
    const classes = dialogHeaderClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactDialogBodyProps
  extends DialogBodyClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const DialogBody = forwardRef<HTMLDivElement, ReactDialogBodyProps>(function DialogBody(
  { scrollBehavior, className, children, ...rest },
  ref,
) {
  const classes = dialogBodyClasses({ scrollBehavior })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export interface ReactDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

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
