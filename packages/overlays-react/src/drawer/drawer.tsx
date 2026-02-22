import { forwardRef, createContext, useContext, useEffect, useId } from "react"
import {
  drawerClasses,
  drawerHeaderClasses,
  drawerBodyClasses,
  drawerFooterClasses,
} from "@paramanu/overlays-js"
import type { DrawerClassesOptions } from "@paramanu/overlays-js"

interface DrawerContextValue {
  onClose?: () => void
  titleId?: string
}

const DrawerContext = createContext<DrawerContextValue>({})

/** Returns the nearest Drawer context value. */
export const useDrawerContext = () => useContext(DrawerContext)

export interface ReactDrawerProps
  extends DrawerClassesOptions, Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
  /** Whether the drawer is open. @default false */
  open?: boolean
  /** Callback invoked when the drawer requests to close. */
  onClose?: () => void
  /** Whether pressing Escape closes the drawer. @default true */
  closeOnEscape?: boolean
  /** Accessible label for the drawer. */
  "aria-label"?: string
  children?: React.ReactNode
}

/**
 * Drawer renders a slide-in panel from an edge of the viewport.
 * Uses `role="dialog"` and `aria-modal="true"`.
 *
 * @example
 * ```tsx
 * <Drawer open={isOpen} onClose={close} placement="end" size="md">
 *   <DrawerHeader>Settings</DrawerHeader>
 *   <DrawerBody>Content</DrawerBody>
 *   <DrawerFooter>
 *     <Btn onClick={close}>Done</Btn>
 *   </DrawerFooter>
 * </Drawer>
 * ```
 */
export const Drawer = forwardRef<HTMLDivElement, ReactDrawerProps>(function Drawer(
  { open = false, onClose, closeOnEscape = true, placement, size, className, children, ...rest },
  ref,
) {
  const uid = useId()
  const titleId = `pm-drawer-title-${uid}`

  const classes = drawerClasses({ placement, size })
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
    <DrawerContext.Provider value={{ onClose, titleId }}>
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
    </DrawerContext.Provider>
  )
})

export interface ReactDrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const DrawerHeader = forwardRef<HTMLDivElement, ReactDrawerHeaderProps>(
  function DrawerHeader({ className, children, id, ...rest }, ref) {
    const ctx = useDrawerContext()
    const classes = drawerHeaderClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <div ref={ref} id={id ?? ctx.titleId} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactDrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const DrawerBody = forwardRef<HTMLDivElement, ReactDrawerBodyProps>(function DrawerBody(
  { className, children, ...rest },
  ref,
) {
  const classes = drawerBodyClasses()
  const combinedClassName = className ? `${classes} ${className}` : classes
  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export interface ReactDrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const DrawerFooter = forwardRef<HTMLDivElement, ReactDrawerFooterProps>(
  function DrawerFooter({ className, children, ...rest }, ref) {
    const classes = drawerFooterClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)
