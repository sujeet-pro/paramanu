import { forwardRef } from "react"
import { menubarClasses, menubarItemClasses } from "@paramanu/navigation-js"
import type { MenubarItemClassesOptions } from "@paramanu/navigation-js"

export interface ReactMenubarProps extends React.HTMLAttributes<HTMLUListElement> {
  children?: React.ReactNode
}

export const Menubar = forwardRef<HTMLUListElement, ReactMenubarProps>(function Menubar(
  { className, children, ...rest },
  ref,
) {
  const classes = menubarClasses()
  const combinedClassName = className ? `${classes} ${className}` : classes
  return (
    <ul ref={ref} role="menubar" className={combinedClassName} {...rest}>
      {children}
    </ul>
  )
})

export interface ReactMenubarItemProps
  extends MenubarItemClassesOptions, React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

export const MenubarItem = forwardRef<HTMLButtonElement, ReactMenubarItemProps>(
  function MenubarItem({ active, disabled, className, children, ...rest }, ref) {
    const classes = menubarItemClasses({ active, disabled })
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <li role="none">
        <button
          ref={ref}
          role="menuitem"
          className={combinedClassName}
          disabled={disabled}
          aria-disabled={disabled || undefined}
          {...rest}
        >
          {children}
        </button>
      </li>
    )
  },
)
