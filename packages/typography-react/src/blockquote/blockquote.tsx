import { forwardRef } from "react"
import { blockquoteClasses } from "@paramanu/typography-js"
import type { BlockquoteClassesOptions } from "@paramanu/typography-js"

export interface ReactBlockquoteProps
  extends BlockquoteClassesOptions,
    React.BlockquoteHTMLAttributes<HTMLQuoteElement> {
  children?: React.ReactNode
}

export const Blockquote = forwardRef<HTMLQuoteElement, ReactBlockquoteProps>(function Blockquote(
  { variant, size, className, children, ...rest },
  ref,
) {
  const classes = blockquoteClasses({ variant, size })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <blockquote ref={ref} className={combinedClassName} {...rest}>
      {children}
    </blockquote>
  )
})
