import { forwardRef } from "react"
import { truncateClasses } from "@paramanu/typography-js"
import type { TruncateClassesOptions } from "@paramanu/typography-js"

export interface ReactTruncateProps
  extends TruncateClassesOptions, React.HTMLAttributes<HTMLDivElement> {
  /** The HTML element to render. Defaults to "div". */
  as?: "div" | "span" | "p"
  children?: React.ReactNode
}

export const Truncate = forwardRef<HTMLDivElement, ReactTruncateProps>(function Truncate(
  { as: Tag = "div", lines, position, className, children, ...rest },
  ref,
) {
  const classes = truncateClasses({ lines, position })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <Tag ref={ref as React.Ref<never>} className={combinedClassName} {...rest}>
      {children}
    </Tag>
  )
})
