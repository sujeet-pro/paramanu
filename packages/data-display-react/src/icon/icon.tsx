import { forwardRef } from "react"
import { iconClasses } from "@paramanu/data-display-js"
import type { IconProps } from "@paramanu/data-display-js"

export interface ReactIconProps
  extends IconProps,
    Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  children?: React.ReactNode
}

export const Icon = forwardRef<HTMLSpanElement, ReactIconProps>(function Icon(
  { size, color, spin, label, className, children, ...rest },
  ref,
) {
  const classes = iconClasses({ size, color, spin })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <span
      ref={ref}
      className={combinedClassName}
      aria-hidden={label ? undefined : true}
      aria-label={label || undefined}
      role={label ? "img" : undefined}
      {...rest}
    >
      {children}
    </span>
  )
})
