import { forwardRef } from "react"
import { groupClasses } from "@paramanu/primitives-js"
import type { GroupProps } from "@paramanu/primitives-js"

export interface ReactGroupProps extends GroupProps, React.HTMLAttributes<HTMLDivElement> {
  /** Child elements. */
  children?: React.ReactNode
}

export const Group = forwardRef<HTMLDivElement, ReactGroupProps>(function Group(
  {
    orientation,
    gap,
    attached,
    wrap,
    align,
    justify,
    grow,
    className,
    children,
    role = "group",
    ...rest
  },
  ref,
) {
  const classes = groupClasses({ orientation, gap, attached, wrap, align, justify, grow })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} role={role} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
