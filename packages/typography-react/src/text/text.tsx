import { forwardRef } from "react"
import { textClasses } from "@paramanu/typography-js"
import type { TextClassesOptions } from "@paramanu/typography-js"

export interface ReactTextProps
  extends TextClassesOptions,
    React.HTMLAttributes<HTMLElement> {
  as?: "p" | "span" | "div" | "label" | "em" | "strong"
  children?: React.ReactNode
}

export const Text = forwardRef<HTMLElement, ReactTextProps>(function Text(
  { as: Tag = "p", size, weight, align, lineHeight, italic, truncate, transform, className, children, ...rest },
  ref,
) {
  const classes = textClasses({ size, weight, align, lineHeight, italic, truncate, transform })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <Tag ref={ref as React.Ref<never>} className={combinedClassName} {...rest}>
      {children}
    </Tag>
  )
})
