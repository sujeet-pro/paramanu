import { forwardRef } from "react"
import {
  breadcrumbsClasses,
  breadcrumbsItemClasses,
  breadcrumbsLinkClasses,
} from "@paramanu/navigation-js"
import type {
  BreadcrumbsClassesOptions,
  BreadcrumbsItemClassesOptions,
} from "@paramanu/navigation-js"

export interface ReactBreadcrumbsProps
  extends BreadcrumbsClassesOptions,
    Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  children?: React.ReactNode
}

export const Breadcrumbs = forwardRef<HTMLElement, ReactBreadcrumbsProps>(function Breadcrumbs(
  { separator, className, children, ...rest },
  ref,
) {
  const classes = breadcrumbsClasses({ separator })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <nav ref={ref} aria-label="Breadcrumb" className={combinedClassName} {...rest}>
      <ol>{children}</ol>
    </nav>
  )
})

export interface ReactBreadcrumbsItemProps
  extends BreadcrumbsItemClassesOptions,
    React.LiHTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode
}

export const BreadcrumbsItem = forwardRef<HTMLLIElement, ReactBreadcrumbsItemProps>(
  function BreadcrumbsItem({ active, className, children, ...rest }, ref) {
    const classes = breadcrumbsItemClasses({ active })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <li ref={ref} className={combinedClassName} {...rest}>
        {active ? <span aria-current="page">{children}</span> : children}
      </li>
    )
  },
)

export interface ReactBreadcrumbsLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode
}

export const BreadcrumbsLink = forwardRef<HTMLAnchorElement, ReactBreadcrumbsLinkProps>(
  function BreadcrumbsLink({ className, children, ...rest }, ref) {
    const classes = breadcrumbsLinkClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <a ref={ref} className={combinedClassName} {...rest}>
        {children}
      </a>
    )
  },
)
