import { forwardRef, useEffect } from "react"
import { popoverClasses, popoverArrowClasses } from "@paramanu/overlays-js"
import type { PopoverClassesOptions } from "@paramanu/overlays-js"

export interface ReactPopoverProps
  extends PopoverClassesOptions, React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  onClose?: () => void
  children?: React.ReactNode
}

export const Popover = forwardRef<HTMLDivElement, ReactPopoverProps>(function Popover(
  { open = false, onClose, placement, hasArrow, className, children, ...rest },
  ref,
) {
  const classes = popoverClasses({ placement, hasArrow })
  const combinedClassName = className ? `${classes} ${className}` : classes

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.()
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export interface ReactPopoverArrowProps extends React.HTMLAttributes<HTMLDivElement> {}

export const PopoverArrow = forwardRef<HTMLDivElement, ReactPopoverArrowProps>(
  function PopoverArrow({ className, ...rest }, ref) {
    const classes = popoverArrowClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return <div ref={ref} className={combinedClassName} {...rest} />
  },
)
