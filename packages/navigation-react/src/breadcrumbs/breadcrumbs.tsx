import { forwardRef } from "react"
import {
  breadcrumbClasses,
  breadcrumbItemClasses,
  breadcrumbsLinkClasses,
} from "@paramanu/navigation-js"
import type {
  BreadcrumbClassesOptions,
  BreadcrumbItemClassesOptions,
} from "@paramanu/navigation-js"

export interface ReactBreadcrumbProps
  extends BreadcrumbClassesOptions,
    Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  children?: React.ReactNode
}

export const Breadcrumb = forwardRef<HTMLElement, ReactBreadcrumbProps>(function Breadcrumb(
  { separator, className, children, ...rest },
  ref,
) {
  const classes = breadcrumbClasses({ separator })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <nav ref={ref} aria-label="Breadcrumb" className={combinedClassName} {...rest}>
      <ol>{children}</ol>
    </nav>
  )
})

export interface ReactBreadcrumbItemProps
  extends BreadcrumbItemClassesOptions,
    React.LiHTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode
}

export const BreadcrumbItem = forwardRef<HTMLLIElement, ReactBreadcrumbItemProps>(
  function BreadcrumbItem({ active, className, children, ...rest }, ref) {
    const classes = breadcrumbItemClasses({ active })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <li ref={ref} className={combinedClassName} {...rest}>
        {active ? <span aria-current="page">{children}</span> : children}
      </li>
    )
  },
)

export interface ReactBreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode
}

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, ReactBreadcrumbLinkProps>(
  function BreadcrumbLink({ className, children, ...rest }, ref) {
    const classes = breadcrumbsLinkClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <a ref={ref} className={combinedClassName} {...rest}>
        {children}
      </a>
    )
  },
)
