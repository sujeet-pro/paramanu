import { forwardRef } from "react"
import { highlightClasses } from "@paramanu/typography-js"
import type { HighlightClassesOptions } from "@paramanu/typography-js"

export interface ReactHighlightProps
  extends HighlightClassesOptions, Omit<React.HTMLAttributes<HTMLElement>, "color"> {
  children?: React.ReactNode
}

export const Highlight = forwardRef<HTMLElement, ReactHighlightProps>(function Highlight(
  { color, variant, className, children, ...rest },
  ref,
) {
  const classes = highlightClasses({ color, variant })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <mark ref={ref as React.Ref<HTMLElement>} className={combinedClassName} {...rest}>
      {children}
    </mark>
  )
})
