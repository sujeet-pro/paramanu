import { forwardRef } from "react"
import { linkClasses } from "@paramanu/navigation-js"
import type { LinkProps } from "@paramanu/navigation-js"

export interface ReactLinkProps
  extends LinkProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href?: string
  children?: React.ReactNode
}

export const Link = forwardRef<HTMLAnchorElement, ReactLinkProps>(function Link(
  { variant, active, disabled, external, underline, href, className, children, ...rest },
  ref,
) {
  const classes = linkClasses({ variant, active, disabled, external, underline })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <a
      ref={ref}
      href={href}
      className={combinedClassName}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-current={active ? "page" : undefined}
      {...rest}
    >
      {children}
    </a>
  )
})
