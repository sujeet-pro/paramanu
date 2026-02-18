import { forwardRef } from "react"
import { dividerClasses } from "@paramanu/primitives-js"
import type { DividerProps } from "@paramanu/primitives-js"

export interface ReactDividerProps
  extends DividerProps,
    Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  /** Additional CSS class names. */
  className?: string
  /** Label text displayed inside the divider line. Only works with horizontal dividers. */
  label?: React.ReactNode
  /** Child elements (alias for label). */
  children?: React.ReactNode
}

export const Divider = forwardRef<HTMLElement, ReactDividerProps>(function Divider(
  { orientation = "horizontal", variant, withLabel, labelPosition, my, label, className, children, ...rest },
  ref,
) {
  const content = label || children
  const hasLabel = withLabel ?? !!content
  const classes = dividerClasses({ orientation, variant, withLabel: hasLabel, labelPosition, my })
  const combinedClassName = className ? `${classes} ${className}` : classes

  if (hasLabel && orientation === "horizontal") {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        role="separator"
        aria-orientation="horizontal"
        className={combinedClassName}
        {...rest}
      >
        {content}
      </div>
    )
  }

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
