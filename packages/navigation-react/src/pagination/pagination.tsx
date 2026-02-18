import { forwardRef } from "react"
import { paginationClasses, paginationItemClasses } from "@paramanu/navigation-js"
import type {
  PaginationClassesOptions,
  PaginationItemClassesOptions,
} from "@paramanu/navigation-js"

export interface ReactPaginationProps
  extends PaginationClassesOptions,
    Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  children?: React.ReactNode
}

export const Pagination = forwardRef<HTMLElement, ReactPaginationProps>(function Pagination(
  { size, variant, className, children, ...rest },
  ref,
) {
  const classes = paginationClasses({ size, variant })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <nav ref={ref} aria-label="Pagination" className={combinedClassName} {...rest}>
      <ul>{children}</ul>
    </nav>
  )
})

export interface ReactPaginationItemProps
  extends PaginationItemClassesOptions,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  children?: React.ReactNode
}

export const PaginationItem = forwardRef<HTMLButtonElement, ReactPaginationItemProps>(
  function PaginationItem({ type = "page", active, disabled, className, children, ...rest }, ref) {
    const classes = paginationItemClasses({ type, active, disabled })
    const combinedClassName = className ? `${classes} ${className}` : classes

    if (type === "ellipsis") {
      return (
        <li>
          <span className={combinedClassName} aria-hidden="true">
            {children}
          </span>
        </li>
      )
    }

    return (
      <li>
        <button
          ref={ref}
          className={combinedClassName}
          aria-current={active ? "page" : undefined}
          aria-disabled={disabled || undefined}
          disabled={disabled}
          {...rest}
        >
          {children}
        </button>
      </li>
    )
  },
)
