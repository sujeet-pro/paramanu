import { forwardRef } from "react"
import { progressBarClasses } from "@paramanu/feedback-js"
import type { ProgressBarClassesOptions } from "@paramanu/feedback-js"

export interface ReactProgressBarProps
  extends ProgressBarClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  /** Format function for the label. Receives the percentage number.
   * @default (pct) => `${Math.round(pct)}%`
   */
  formatLabel?: (percentage: number) => string
}

/**
 * ProgressBar displays determinate or indeterminate linear progress.
 *
 * Uses `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`.
 */
export const ProgressBar = forwardRef<HTMLDivElement, ReactProgressBarProps>(function ProgressBar(
  {
    size,
    variant,
    striped,
    animated,
    indeterminate,
    showLabel,
    value = 0,
    min = 0,
    max = 100,
    formatLabel,
    className,
    ...rest
  },
  ref,
) {
  const classes = progressBarClasses({ size, variant, striped, animated, indeterminate, showLabel, value, min, max })
  const combinedClassName = className ? `${classes.root} ${className}` : classes.root
  const percentage = max > min ? ((value - min) / (max - min)) * 100 : 0
  const labelText = formatLabel ? formatLabel(percentage) : `${Math.round(percentage)}%`

  return (
    <div
      ref={ref}
      className={combinedClassName}
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : value}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-label={rest["aria-label"] ?? "Progress"}
      {...rest}
    >
      {showLabel && <div className={classes.label}>{labelText}</div>}
      <div className={classes.track}>
        <div
          className={classes.fill}
          style={indeterminate ? undefined : { width: `${percentage}%` }}
        />
      </div>
    </div>
  )
})
