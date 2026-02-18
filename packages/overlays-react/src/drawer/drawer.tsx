import { forwardRef, useCallback, useEffect } from "react"
import {
  drawerClasses,
  drawerHeaderClasses,
  drawerBodyClasses,
  drawerFooterClasses,
} from "@paramanu/overlays-js"
import type { DrawerClassesOptions } from "@paramanu/overlays-js"

export interface ReactDrawerProps
  extends DrawerClassesOptions,
    Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
  open?: boolean
  onClose?: () => void
  closeOnEscape?: boolean
  children?: React.ReactNode
}

export const Drawer = forwardRef<HTMLDivElement, ReactDrawerProps>(function Drawer(
  {
    open = false,
    onClose,
    closeOnEscape = true,
    placement,
    size,
    className,
    children,
    ...rest
  },
  ref,
) {
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
    <div ref={ref} role="dialog" aria-modal="true" className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export interface ReactDrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const DrawerHeader = forwardRef<HTMLDivElement, ReactDrawerHeaderProps>(
  function DrawerHeader({ className, children, ...rest }, ref) {
    const classes = drawerHeaderClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <div ref={ref} className={combinedClassName} {...rest}>
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
