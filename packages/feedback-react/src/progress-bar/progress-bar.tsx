import { forwardRef } from "react"
import { progressBarClasses } from "@paramanu/feedback-js"
import type { ProgressBarClassesOptions } from "@paramanu/feedback-js"

export interface ReactProgressBarProps
  extends ProgressBarClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {}

export const ProgressBar = forwardRef<HTMLDivElement, ReactProgressBarProps>(function ProgressBar(
  { size, variant, striped, animated, indeterminate, value = 0, min = 0, max = 100, className, ...rest },
  ref,
) {
  const classes = progressBarClasses({ size, variant, striped, animated, indeterminate, value, min, max })
  const combinedClassName = className ? `${classes.root} ${className}` : classes.root
  const percentage = max > min ? ((value - min) / (max - min)) * 100 : 0

  return (
    <div
      ref={ref}
      className={combinedClassName}
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : value}
      aria-valuemin={min}
      aria-valuemax={max}
      {...rest}
    >
      <div className={classes.track}>
        <div
          className={classes.fill}
          style={indeterminate ? undefined : { width: `${percentage}%` }}
        />
      </div>
    </div>
  )
})
