import { forwardRef } from "react"
import {
  navbarClasses,
  navbarInnerClasses,
  navbarSectionClasses,
  navbarBrandClasses,
  navbarToggleClasses,
} from "@paramanu/navigation-js"
import type { NavbarClassesOptions, NavbarSectionClassesOptions } from "@paramanu/navigation-js"

export interface ReactNavbarProps
  extends NavbarClassesOptions,
    React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
}

export const Navbar = forwardRef<HTMLElement, ReactNavbarProps>(function Navbar(
  { variant, position, className, children, ...rest },
  ref,
) {
  const classes = navbarClasses({ variant, position })
  const combinedClassName = className ? `${classes} ${className}` : classes
  return (
    <nav ref={ref} className={combinedClassName} {...rest}>
      {children}
    </nav>
  )
})

export interface ReactNavbarInnerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const NavbarInner = forwardRef<HTMLDivElement, ReactNavbarInnerProps>(
  function NavbarInner({ className, children, ...rest }, ref) {
    const classes = navbarInnerClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactNavbarSectionProps
  extends NavbarSectionClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const NavbarSection = forwardRef<HTMLDivElement, ReactNavbarSectionProps>(
  function NavbarSection({ align, className, children, ...rest }, ref) {
    const classes = navbarSectionClasses({ align })
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactNavbarBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const NavbarBrand = forwardRef<HTMLDivElement, ReactNavbarBrandProps>(
  function NavbarBrand({ className, children, ...rest }, ref) {
    const classes = navbarBrandClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactNavbarToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

export const NavbarToggle = forwardRef<HTMLButtonElement, ReactNavbarToggleProps>(
  function NavbarToggle({ className, children, type = "button", ...rest }, ref) {
    const classes = navbarToggleClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <button ref={ref} type={type} className={combinedClassName} {...rest}>
        {children}
      </button>
    )
  },
)
