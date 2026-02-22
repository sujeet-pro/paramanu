import { forwardRef } from "react"
import { markClasses } from "@paramanu/typography-js"
import type { MarkClassesOptions } from "@paramanu/typography-js"

export interface ReactMarkProps
  extends MarkClassesOptions, Omit<React.HTMLAttributes<HTMLElement>, "color"> {
  children?: React.ReactNode
}

export const Mark = forwardRef<HTMLElement, ReactMarkProps>(function Mark(
  { variant, color, className, children, ...rest },
  ref,
) {
  const classes = markClasses({ variant, color })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <mark ref={ref as React.Ref<HTMLElement>} className={combinedClassName} {...rest}>
      {children}
    </mark>
  )
})
