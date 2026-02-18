import { forwardRef } from "react"
import {
  sidebarClasses,
  sidebarSectionClasses,
  sidebarSectionLabelClasses,
  sidebarItemClasses,
} from "@paramanu/navigation-js"
import type { SidebarClassesOptions, SidebarItemClassesOptions } from "@paramanu/navigation-js"

export interface ReactSidebarProps
  extends SidebarClassesOptions,
    React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
}

export const Sidebar = forwardRef<HTMLElement, ReactSidebarProps>(function Sidebar(
  { width, collapsed, position, className, children, ...rest },
  ref,
) {
  const classes = sidebarClasses({ width, collapsed, position })
  const combinedClassName = className ? `${classes} ${className}` : classes
  return (
    <nav ref={ref} className={combinedClassName} {...rest}>
      {children}
    </nav>
  )
})

export interface ReactSidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const SidebarSection = forwardRef<HTMLDivElement, ReactSidebarSectionProps>(
  function SidebarSection({ className, children, ...rest }, ref) {
    const classes = sidebarSectionClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactSidebarSectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const SidebarSectionLabel = forwardRef<HTMLDivElement, ReactSidebarSectionLabelProps>(
  function SidebarSectionLabel({ className, children, ...rest }, ref) {
    const classes = sidebarSectionLabelClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactSidebarItemProps
  extends SidebarItemClassesOptions,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  children?: React.ReactNode
  as?: "a" | "button"
}

export const SidebarItem = forwardRef<HTMLAnchorElement | HTMLButtonElement, ReactSidebarItemProps>(
  function SidebarItem(
    { active, disabled, indent, as = "a", className, children, ...rest },
    ref,
  ) {
    const classes = sidebarItemClasses({ active, disabled, indent })
    const combinedClassName = className ? `${classes} ${className}` : classes

    if (as === "button") {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          className={combinedClassName}
          disabled={disabled}
          aria-disabled={disabled || undefined}
          aria-current={active ? "page" : undefined}
          {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {children}
        </button>
      )
    }

    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={combinedClassName}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        aria-current={active ? "page" : undefined}
        {...rest}
      >
        {children}
      </a>
    )
  },
)
