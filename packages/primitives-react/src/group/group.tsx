import { forwardRef } from "react"
import { groupClasses } from "@paramanu/primitives-js"
import type { GroupProps } from "@paramanu/primitives-js"

export interface ReactGroupProps
  extends GroupProps,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Group = forwardRef<HTMLDivElement, ReactGroupProps>(function Group(
  { orientation, gap, attached, className, children, role = "group", ...rest },
  ref,
) {
  const classes = groupClasses({ orientation, gap, attached })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} role={role} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
