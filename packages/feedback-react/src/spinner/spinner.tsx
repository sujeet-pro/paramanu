import { forwardRef } from "react"
import { spinnerClasses } from "@paramanu/feedback-js"
import type { SpinnerClassesOptions } from "@paramanu/feedback-js"

export interface ReactSpinnerProps
  extends SpinnerClassesOptions, React.HTMLAttributes<HTMLDivElement> {}

export const Spinner = forwardRef<HTMLDivElement, ReactSpinnerProps>(function Spinner(
  { size, variant, className, ...rest },
  ref,
) {
  const classes = spinnerClasses({ size, variant })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} role="status" {...rest}>
      <span
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          borderWidth: 0,
        }}
      >
        Loading
      </span>
    </div>
  )
})
