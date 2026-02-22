import { forwardRef } from "react"
import { skipLinkClasses } from "@paramanu/navigation-js"

export interface ReactSkipLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string
  children?: React.ReactNode
}

export const SkipLink = forwardRef<HTMLAnchorElement, ReactSkipLinkProps>(function SkipLink(
  { href = "#main-content", className, children, ...rest },
  ref,
) {
  const classes = skipLinkClasses()
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <a ref={ref} href={href} className={combinedClassName} {...rest}>
      {children ?? "Skip to main content"}
    </a>
  )
})
