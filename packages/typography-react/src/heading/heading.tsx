import { forwardRef } from "react"
import { headingClasses } from "@paramanu/typography-js"
import type { HeadingClassesOptions } from "@paramanu/typography-js"

export interface ReactHeadingProps
  extends HeadingClassesOptions,
    Omit<React.HTMLAttributes<HTMLHeadingElement>, "color"> {
  children?: React.ReactNode
}

export const Heading = forwardRef<HTMLHeadingElement, ReactHeadingProps>(function Heading(
  { level = 2, size, weight, align, lineHeight, truncate, color, className, children, ...rest },
  ref,
) {
  const classes = headingClasses({ level, size, weight, align, lineHeight, truncate, color })
  const combinedClassName = className ? `${classes} ${className}` : classes
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

  return (
    <Tag ref={ref} className={combinedClassName} {...rest}>
      {children}
    </Tag>
  )
})
