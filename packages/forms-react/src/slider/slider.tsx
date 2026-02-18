import { forwardRef } from "react"
import { sliderClasses } from "@paramanu/forms-js"
import type { SliderProps } from "@paramanu/forms-js"

export interface ReactSliderProps
  extends SliderProps,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Slider = forwardRef<HTMLDivElement, ReactSliderProps>(function Slider(
  { size, disabled, orientation, showMarks, min = 0, max = 100, step, className, children, ...rest },
  ref,
) {
  const classes = sliderClasses({ size, disabled, orientation, showMarks })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div
      ref={ref}
      role="slider"
      className={combinedClassName}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-orientation={orientation || "horizontal"}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? undefined : 0}
      {...rest}
    >
      {children}
    </div>
  )
})
