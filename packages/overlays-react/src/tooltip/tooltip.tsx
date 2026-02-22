import { forwardRef } from "react"
import { tooltipClasses, tooltipArrowClasses } from "@paramanu/overlays-js"
import type { TooltipClassesOptions } from "@paramanu/overlays-js"

export interface ReactTooltipProps
  extends TooltipClassesOptions, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Tooltip = forwardRef<HTMLDivElement, ReactTooltipProps>(function Tooltip(
  { placement, className, children, ...rest },
  ref,
) {
  const classes = tooltipClasses({ placement })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} role="tooltip" className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export interface ReactTooltipArrowProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TooltipArrow = forwardRef<HTMLDivElement, ReactTooltipArrowProps>(
  function TooltipArrow({ className, ...rest }, ref) {
    const classes = tooltipArrowClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return <div ref={ref} className={combinedClassName} {...rest} />
  },
)
