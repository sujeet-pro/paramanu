import { forwardRef } from "react"
import {
  dropdownClasses,
  dropdownMenuTriggerClasses,
  dropdownMenuContentClasses,
} from "@paramanu/navigation-js"
import type { DropdownClassesOptions } from "@paramanu/navigation-js"

export interface ReactDropdownProps
  extends DropdownClassesOptions, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Dropdown = forwardRef<HTMLDivElement, ReactDropdownProps>(function Dropdown(
  { size, open, className, children, ...rest },
  ref,
) {
  const classes = dropdownClasses({ size, open })
  const combinedClassName = className ? `${classes} ${className}` : classes
  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export interface ReactDropdownTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  expanded?: boolean
}

export const DropdownTrigger = forwardRef<HTMLButtonElement, ReactDropdownTriggerProps>(
  function DropdownTrigger({ expanded, className, children, ...rest }, ref) {
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

export interface ReactDropdownContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const DropdownContent = forwardRef<HTMLDivElement, ReactDropdownContentProps>(
  function DropdownContent({ className, children, ...rest }, ref) {
    const classes = dropdownMenuContentClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <div ref={ref} role="menu" className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)
