import { forwardRef } from "react"
import { ringProgressClasses } from "@paramanu/feedback-js"
import type { RingProgressClassesOptions } from "@paramanu/feedback-js"

const SIZE_MAP: Record<string, number> = { sm: 32, md: 48, lg: 64, xl: 80 }
const RADIUS = 20
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export interface ReactRingProgressProps
  extends RingProgressClassesOptions, React.HTMLAttributes<HTMLDivElement> {
  thickness?: number
}

export const RingProgress = forwardRef<HTMLDivElement, ReactRingProgressProps>(
  function RingProgress(
    {
      size = "md",
      variant,
      indeterminate,
      value = 0,
      min = 0,
      max = 100,
      thickness = 4,
      className,
      ...rest
    },
    ref,
  ) {
    const classes = ringProgressClasses({ size, variant, indeterminate, value, min, max })
    const combinedClassName = className ? `${classes.root} ${className}` : classes.root
    const percentage = max > min ? ((value - min) / (max - min)) * 100 : 0
    const strokeDashoffset = indeterminate ? undefined : CIRCUMFERENCE * (1 - percentage / 100)
    const svgSize = SIZE_MAP[size] ?? SIZE_MAP.md

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
        <svg className={classes.svg} viewBox="0 0 44 44" width={svgSize} height={svgSize}>
          <circle
            className={classes.track}
            cx="22"
            cy="22"
            r={RADIUS}
            fill="none"
            strokeWidth={thickness}
          />
          <circle
            className={classes.fill}
            cx="22"
            cy="22"
            r={RADIUS}
            fill="none"
            strokeWidth={thickness}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
      </div>
    )
  },
)
