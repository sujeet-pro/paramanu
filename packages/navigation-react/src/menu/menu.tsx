import { forwardRef } from "react"
import {
  menuClasses,
  menuItemClasses,
  menuGroupClasses,
  menuGroupLabelClasses,
  menuSeparatorClasses,
} from "@paramanu/navigation-js"
import type { MenuClassesOptions, MenuItemClassesOptions } from "@paramanu/navigation-js"

export interface ReactMenuProps extends MenuClassesOptions, React.HTMLAttributes<HTMLUListElement> {
  children?: React.ReactNode
}

export const Menu = forwardRef<HTMLUListElement, ReactMenuProps>(function Menu(
  { size, className, children, ...rest },
  ref,
) {
  const classes = menuClasses({ size })
  const combinedClassName = className ? `${classes} ${className}` : classes
  return (
    <ul ref={ref} role="menu" className={combinedClassName} {...rest}>
      {children}
    </ul>
  )
})

export interface ReactMenuItemProps
  extends MenuItemClassesOptions, React.LiHTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode
}

export const MenuItem = forwardRef<HTMLLIElement, ReactMenuItemProps>(function MenuItem(
  { active, disabled, destructive, className, children, ...rest },
  ref,
) {
  const classes = menuItemClasses({ active, disabled, destructive })
  const combinedClassName = className ? `${classes} ${className}` : classes
  return (
    <li
      ref={ref}
      role="menuitem"
      className={combinedClassName}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {children}
    </li>
  )
})

export interface ReactMenuGroupProps extends React.HTMLAttributes<HTMLUListElement> {
  children?: React.ReactNode
}

export const MenuGroup = forwardRef<HTMLUListElement, ReactMenuGroupProps>(function MenuGroup(
  { className, children, ...rest },
  ref,
) {
  const classes = menuGroupClasses()
  const combinedClassName = className ? `${classes} ${className}` : classes
  return (
    <li role="none">
      <ul ref={ref} role="group" className={combinedClassName} {...rest}>
        {children}
      </ul>
    </li>
  )
})

export interface ReactMenuGroupLabelProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode
}

export const MenuGroupLabel = forwardRef<HTMLLIElement, ReactMenuGroupLabelProps>(
  function MenuGroupLabel({ className, children, ...rest }, ref) {
    const classes = menuGroupLabelClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <li ref={ref} role="presentation" className={combinedClassName} {...rest}>
        {children}
      </li>
    )
  },
)

export const MenuSeparator = forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  function MenuSeparator({ className, ...rest }, ref) {
    const classes = menuSeparatorClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return <li ref={ref} role="separator" className={combinedClassName} {...rest} />
  },
)
