import { forwardRef } from "react"
import { hovercardClasses, hoverCardArrowClasses } from "@paramanu/overlays-js"
import type { HovercardClassesOptions } from "@paramanu/overlays-js"

export interface ReactHovercardProps
  extends HovercardClassesOptions, React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  children?: React.ReactNode
}

export const Hovercard = forwardRef<HTMLDivElement, ReactHovercardProps>(function Hovercard(
  { open = false, placement, className, children, ...rest },
  ref,
) {
  const classes = hovercardClasses({ placement })
  const combinedClassName = className ? `${classes} ${className}` : classes

  if (!open) return null

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export interface ReactHovercardArrowProps extends React.HTMLAttributes<HTMLDivElement> {}

export const HovercardArrow = forwardRef<HTMLDivElement, ReactHovercardArrowProps>(
  function HovercardArrow({ className, ...rest }, ref) {
    const classes = hoverCardArrowClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return <div ref={ref} className={combinedClassName} {...rest} />
  },
)
