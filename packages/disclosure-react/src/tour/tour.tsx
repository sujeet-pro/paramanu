import { forwardRef } from "react"
import { tourClasses, tourStepClasses, tourOverlayClasses } from "@paramanu/disclosure-js"
import type {
  TourClassesOptions,
  TourStepClassesOptions,
  TourOverlayClassesOptions,
} from "@paramanu/disclosure-js"

export interface ReactTourProps
  extends TourClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Tour = forwardRef<HTMLDivElement, ReactTourProps>(function Tour(
  { open, className, children, ...rest },
  ref,
) {
  const classes = tourClasses({ open })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export interface ReactTourStepProps
  extends TourStepClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const TourStep = forwardRef<HTMLDivElement, ReactTourStepProps>(function TourStep(
  { placement, active, className, children, ...rest },
  ref,
) {
  const classes = tourStepClasses({ placement, active })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div
      ref={ref}
      role="dialog"
      className={combinedClassName}
      {...rest}
    >
      {children}
    </div>
  )
})

export interface ReactTourOverlayProps
  extends TourOverlayClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {}

export const TourOverlay = forwardRef<HTMLDivElement, ReactTourOverlayProps>(
  function TourOverlay({ visible, className, ...rest }, ref) {
    const classes = tourOverlayClasses({ visible })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return <div ref={ref} className={combinedClassName} aria-hidden="true" {...rest} />
  },
)
