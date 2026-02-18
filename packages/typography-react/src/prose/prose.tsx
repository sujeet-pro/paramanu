import { forwardRef } from "react"
import { proseClasses } from "@paramanu/typography-js"
import type { ProseClassesOptions } from "@paramanu/typography-js"

export interface ReactProseProps
  extends ProseClassesOptions,
    Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  /** The HTML element to render. Defaults to "div". Use "article" for standalone content. */
  as?: "div" | "article" | "section"
  children?: React.ReactNode
}

export const Prose = forwardRef<HTMLDivElement, ReactProseProps>(function Prose(
  { as: Tag = "div", size, color, trimMargins, className, children, ...rest },
  ref,
) {
  const classes = proseClasses({ size, color, trimMargins })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <Tag ref={ref as React.Ref<never>} className={combinedClassName} {...rest}>
      {children}
    </Tag>
  )
})
