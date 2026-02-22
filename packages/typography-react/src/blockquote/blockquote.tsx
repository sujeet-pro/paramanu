import { forwardRef } from "react"
import { blockquoteClasses } from "@paramanu/typography-js"
import type { BlockquoteClassesOptions } from "@paramanu/typography-js"

export interface ReactBlockquoteProps
  extends
    BlockquoteClassesOptions,
    Omit<React.BlockquoteHTMLAttributes<HTMLQuoteElement>, "color" | "cite"> {
  /** The source/attribution text displayed below the quote. */
  cite?: React.ReactNode
  /** URL for the source of the quotation (sets the HTML cite attribute). */
  citeUrl?: string
  children?: React.ReactNode
}

export const Blockquote = forwardRef<HTMLQuoteElement, ReactBlockquoteProps>(function Blockquote(
  { variant, size, color, withCite, withIcon, cite, citeUrl, className, children, ...rest },
  ref,
) {
  const hasCite = withCite ?? Boolean(cite)
  const classes = blockquoteClasses({ variant, size, color, withCite: hasCite, withIcon })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <blockquote ref={ref} className={combinedClassName} cite={citeUrl} {...rest}>
      {children}
      {cite && <cite>{cite}</cite>}
    </blockquote>
  )
})
