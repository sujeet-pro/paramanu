import { forwardRef } from "react"
import { badgeClasses } from "@paramanu/data-display-js"
import type { BadgeProps } from "@paramanu/data-display-js"

export interface ReactBadgeProps
  extends BadgeProps, Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  children?: React.ReactNode
}

export const Badge = forwardRef<HTMLSpanElement, ReactBadgeProps>(function Badge(
  { variant, size, color, pill, className, children, ...rest },
  ref,
) {
  const classes = badgeClasses({ variant, size, color, pill })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <span ref={ref} className={combinedClassName} {...rest}>
      {children}
    </span>
  )
})
