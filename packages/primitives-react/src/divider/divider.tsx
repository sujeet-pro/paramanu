import { forwardRef } from "react"
import { dividerClasses } from "@paramanu/primitives-js"
import type { DividerProps } from "@paramanu/primitives-js"

export interface ReactDividerProps
  extends DividerProps,
    Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  className?: string
}

export const Divider = forwardRef<HTMLElement, ReactDividerProps>(function Divider(
  { orientation = "horizontal", variant, className, ...rest },
  ref,
) {
  const classes = dividerClasses({ orientation, variant })
  const combinedClassName = className ? `${classes} ${className}` : classes

  if (orientation === "vertical") {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        role="separator"
        aria-orientation="vertical"
        className={combinedClassName}
        {...rest}
      />
    )
  }

  return (
    <hr
      ref={ref as React.Ref<HTMLHRElement>}
      aria-orientation="horizontal"
      className={combinedClassName}
      {...rest}
    />
  )
})
