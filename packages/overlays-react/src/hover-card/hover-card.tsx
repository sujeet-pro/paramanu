import { forwardRef } from "react"
import { hoverCardClasses, hoverCardArrowClasses } from "@paramanu/overlays-js"
import type { HoverCardClassesOptions } from "@paramanu/overlays-js"

export interface ReactHoverCardProps
  extends HoverCardClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  children?: React.ReactNode
}

export const HoverCard = forwardRef<HTMLDivElement, ReactHoverCardProps>(function HoverCard(
  { open = false, placement, className, children, ...rest },
  ref,
) {
  const classes = hoverCardClasses({ placement })
  const combinedClassName = className ? `${classes} ${className}` : classes

  if (!open) return null

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export interface ReactHoverCardArrowProps extends React.HTMLAttributes<HTMLDivElement> {}

export const HoverCardArrow = forwardRef<HTMLDivElement, ReactHoverCardArrowProps>(
  function HoverCardArrow({ className, ...rest }, ref) {
    const classes = hoverCardArrowClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return <div ref={ref} className={combinedClassName} {...rest} />
  },
)
