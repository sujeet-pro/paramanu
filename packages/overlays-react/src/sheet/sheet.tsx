import { forwardRef, createContext, useContext, useEffect, useId } from "react"
import {
  sheetClasses,
  sheetHeaderClasses,
  sheetBodyClasses,
  sheetHandleClasses,
} from "@paramanu/overlays-js"
import type { SheetClassesOptions } from "@paramanu/overlays-js"

interface SheetContextValue {
  onClose?: () => void
  titleId?: string
}

const SheetContext = createContext<SheetContextValue>({})

/** Returns the nearest Sheet context value. */
export const useSheetContext = () => useContext(SheetContext)

export interface ReactSheetProps
  extends SheetClassesOptions, Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
  /** Whether the sheet is open. @default false */
  open?: boolean
  /** Callback invoked when the sheet requests to close. */
  onClose?: () => void
  /** Whether pressing Escape closes the sheet. @default true */
  closeOnEscape?: boolean
  /** Accessible label for the sheet. */
  "aria-label"?: string
  children?: React.ReactNode
}

/**
 * Sheet renders a bottom panel that slides up from the viewport bottom.
 * Commonly used on mobile for contextual content.
 * Uses `role="dialog"` and `aria-modal="true"`.
 *
 * @example
 * ```tsx
 * <Sheet open={isOpen} onClose={close} size="md">
 *   <SheetHandle />
 *   <SheetHeader>Options</SheetHeader>
 *   <SheetBody>Content</SheetBody>
 * </Sheet>
 * ```
 */
export const Sheet = forwardRef<HTMLDivElement, ReactSheetProps>(function Sheet(
  { open = false, onClose, closeOnEscape = true, size, dismissible, className, children, ...rest },
  ref,
) {
  const uid = useId()
  const titleId = `pm-sheet-title-${uid}`

  const classes = sheetClasses({ size, dismissible })
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
    <SheetContext.Provider value={{ onClose, titleId }}>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={rest["aria-label"] ? undefined : titleId}
        className={combinedClassName}
        {...rest}
      >
        {children}
      </div>
    </SheetContext.Provider>
  )
})

export interface ReactSheetHandleProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * SheetHandle renders a drag indicator at the top of the sheet.
 */
export const SheetHandle = forwardRef<HTMLDivElement, ReactSheetHandleProps>(function SheetHandle(
  { className, ...rest },
  ref,
) {
  const classes = sheetHandleClasses()
  const combinedClassName = className ? `${classes} ${className}` : classes
  return <div ref={ref} className={combinedClassName} aria-hidden="true" {...rest} />
})

export interface ReactSheetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const SheetHeader = forwardRef<HTMLDivElement, ReactSheetHeaderProps>(function SheetHeader(
  { className, children, id, ...rest },
  ref,
) {
  const ctx = useSheetContext()
  const classes = sheetHeaderClasses()
  const combinedClassName = className ? `${classes} ${className}` : classes
  return (
    <div ref={ref} id={id ?? ctx.titleId} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

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
