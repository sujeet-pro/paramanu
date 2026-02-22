import { forwardRef } from "react"
import { backdropClasses } from "@paramanu/overlays-js"
import type { BackdropClassesOptions } from "@paramanu/overlays-js"

export interface ReactBackdropProps
  extends BackdropClassesOptions, React.HTMLAttributes<HTMLDivElement> {
  /** Click handler for the backdrop, typically used to close overlays. */
  onClick?: React.MouseEventHandler<HTMLDivElement>
  children?: React.ReactNode
}

/**
 * Backdrop renders a fixed overlay behind modal content.
 * Used internally by Dialog, Alertdialog, Drawer, Sheet, and CmdPalette.
 *
 * @example
 * ```tsx
 * <Backdrop variant="default" onClick={onClose} />
 * <Backdrop variant="blur" />
 * ```
 */
export const Backdrop = forwardRef<HTMLDivElement, ReactBackdropProps>(function Backdrop(
  { variant, visible, className, children, ...rest },
  ref,
) {
  const classes = backdropClasses({ variant, visible })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} aria-hidden="true" {...rest}>
      {children}
    </div>
  )
})
