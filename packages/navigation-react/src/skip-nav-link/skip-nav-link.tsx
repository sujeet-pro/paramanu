import { forwardRef } from "react"
import { skipNavLinkClasses } from "@paramanu/navigation-js"

export interface ReactSkipNavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string
  children?: React.ReactNode
}

export const SkipNavLink = forwardRef<HTMLAnchorElement, ReactSkipNavLinkProps>(
  function SkipNavLink({ href = "#main-content", className, children, ...rest }, ref) {
    const classes = skipNavLinkClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <a ref={ref} href={href} className={combinedClassName} {...rest}>
        {children ?? "Skip to main content"}
      </a>
    )
  },
)
