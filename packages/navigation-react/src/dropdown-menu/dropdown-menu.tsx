import { forwardRef } from "react"
import {
  dropdownMenuClasses,
  dropdownMenuTriggerClasses,
  dropdownMenuContentClasses,
} from "@paramanu/navigation-js"
import type { DropdownMenuClassesOptions } from "@paramanu/navigation-js"

export interface ReactDropdownMenuProps
  extends DropdownMenuClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const DropdownMenu = forwardRef<HTMLDivElement, ReactDropdownMenuProps>(
  function DropdownMenu({ size, open, className, children, ...rest }, ref) {
    const classes = dropdownMenuClasses({ size, open })
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactDropdownMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  expanded?: boolean
}

export const DropdownMenuTrigger = forwardRef<HTMLButtonElement, ReactDropdownMenuTriggerProps>(
  function DropdownMenuTrigger({ expanded, className, children, ...rest }, ref) {
    const classes = dropdownMenuTriggerClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <button
        ref={ref}
        className={combinedClassName}
        aria-haspopup="true"
        aria-expanded={expanded}
        {...rest}
      >
        {children}
      </button>
    )
  },
)

export interface ReactDropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const DropdownMenuContent = forwardRef<HTMLDivElement, ReactDropdownMenuContentProps>(
  function DropdownMenuContent({ className, children, ...rest }, ref) {
    const classes = dropdownMenuContentClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <div ref={ref} role="menu" className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)
