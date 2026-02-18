import { forwardRef, useEffect } from "react"
import {
  sheetClasses,
  sheetHeaderClasses,
  sheetBodyClasses,
  sheetHandleClasses,
} from "@paramanu/overlays-js"
import type { SheetClassesOptions } from "@paramanu/overlays-js"

export interface ReactSheetProps
  extends SheetClassesOptions,
    Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
  open?: boolean
  onClose?: () => void
  closeOnEscape?: boolean
  children?: React.ReactNode
}

export const Sheet = forwardRef<HTMLDivElement, ReactSheetProps>(function Sheet(
  { open = false, onClose, closeOnEscape = true, size, className, children, ...rest },
  ref,
) {
  const classes = sheetClasses({ size })
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
    <div ref={ref} role="dialog" aria-modal="true" className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export interface ReactSheetHandleProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SheetHandle = forwardRef<HTMLDivElement, ReactSheetHandleProps>(
  function SheetHandle({ className, ...rest }, ref) {
    const classes = sheetHandleClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return <div ref={ref} className={combinedClassName} {...rest} />
  },
)

export interface ReactSheetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const SheetHeader = forwardRef<HTMLDivElement, ReactSheetHeaderProps>(
  function SheetHeader({ className, children, ...rest }, ref) {
    const classes = sheetHeaderClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactSheetBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const SheetBody = forwardRef<HTMLDivElement, ReactSheetBodyProps>(function SheetBody(
  { className, children, ...rest },
  ref,
) {
  const classes = sheetBodyClasses()
  const combinedClassName = className ? `${classes} ${className}` : classes
  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
