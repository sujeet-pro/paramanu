import { forwardRef } from "react"
import { tabsClasses, tabListClasses, tabClasses, tabPanelClasses } from "@paramanu/navigation-js"
import type { TabsClassesOptions, TabClassesOptions } from "@paramanu/navigation-js"

export interface ReactTabsProps extends TabsClassesOptions, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Tabs = forwardRef<HTMLDivElement, ReactTabsProps>(function Tabs(
  { variant, size, orientation, fitted, className, children, ...rest },
  ref,
) {
  const classes = tabsClasses({ variant, size, orientation, fitted })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export interface ReactTabListProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const TabList = forwardRef<HTMLDivElement, ReactTabListProps>(function TabList(
  { className, children, ...rest },
  ref,
) {
  const classes = tabListClasses()
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} role="tablist" className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export interface ReactTabProps
  extends TabClassesOptions, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  children?: React.ReactNode
}

export const Tab = forwardRef<HTMLButtonElement, ReactTabProps>(function Tab(
  { active, disabled, className, children, ...rest },
  ref,
) {
  const classes = tabClasses({ active, disabled })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <button
      ref={ref}
      role="tab"
      type="button"
      className={combinedClassName}
      aria-selected={active || false}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      tabIndex={active ? 0 : -1}
      {...rest}
    >
      {children}
    </button>
  )
})

export interface ReactTabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const TabPanel = forwardRef<HTMLDivElement, ReactTabPanelProps>(function TabPanel(
  { className, children, ...rest },
  ref,
) {
  const classes = tabPanelClasses()
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} role="tabpanel" tabIndex={0} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
