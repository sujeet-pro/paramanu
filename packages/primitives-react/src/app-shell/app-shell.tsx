import { forwardRef, createContext, useContext, useState, useCallback } from "react"
import {
  shellClasses,
  appShellHeaderClasses,
  appShellSidebarClasses,
  appShellMainClasses,
  appShellFooterClasses,
} from "@paramanu/primitives-js"
import type {
  ShellProps,
  ShellHeaderProps,
  ShellSidebarProps,
  ShellSidebarWidth,
} from "@paramanu/primitives-js"

interface ShellContextValue {
  sidebarCollapsed: boolean
  toggleSidebar: () => void
}

const ShellContext = createContext<ShellContextValue>({
  sidebarCollapsed: false,
  toggleSidebar: () => {},
})

function useShellContext() {
  return useContext(ShellContext)
}

// --- Shell (container) ---

export interface ReactShellProps
  extends ShellProps,
    React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
  defaultSidebarCollapsed?: boolean
  onSidebarToggle?: (collapsed: boolean) => void
}

export const Shell = forwardRef<HTMLDivElement, ReactShellProps>(function Shell(
  {
    sidebarCollapsed: controlledCollapsed,
    sidebarPosition = "start",
    className,
    children,
    defaultSidebarCollapsed = false,
    onSidebarToggle,
    ...rest
  },
  ref,
) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultSidebarCollapsed)
  const isControlled = controlledCollapsed !== undefined
  const collapsed = isControlled ? controlledCollapsed : internalCollapsed

  const toggleSidebar = useCallback(() => {
    const next = !collapsed
    if (!isControlled) setInternalCollapsed(next)
    onSidebarToggle?.(next)
  }, [collapsed, isControlled, onSidebarToggle])

  const classes = shellClasses({ sidebarCollapsed: collapsed, sidebarPosition })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <ShellContext.Provider value={{ sidebarCollapsed: collapsed, toggleSidebar }}>
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    </ShellContext.Provider>
  )
})

// --- ShellHeader ---

export interface ReactShellHeaderProps
  extends ShellHeaderProps,
    React.HTMLAttributes<HTMLElement> {
  className?: string
  children?: React.ReactNode
}

export const ShellHeader = forwardRef<HTMLElement, ReactShellHeaderProps>(
  function ShellHeader({ sticky, className, children, ...rest }, ref) {
    const classes = appShellHeaderClasses({ sticky })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <header ref={ref} className={combinedClassName} {...rest}>
        {children}
      </header>
    )
  },
)

// --- ShellSidebar ---

export interface ReactShellSidebarProps
  extends ShellSidebarProps,
    React.HTMLAttributes<HTMLElement> {
  className?: string
  children?: React.ReactNode
}

export const ShellSidebar = forwardRef<HTMLElement, ReactShellSidebarProps>(
  function ShellSidebar(
    { width = "md" as ShellSidebarWidth, collapsed: propCollapsed, className, children, ...rest },
    ref,
  ) {
    const { sidebarCollapsed } = useShellContext()
    const isCollapsed = propCollapsed !== undefined ? propCollapsed : sidebarCollapsed
    const classes = appShellSidebarClasses({ width, collapsed: isCollapsed })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <aside ref={ref} className={combinedClassName} {...rest}>
        {children}
      </aside>
    )
  },
)

// --- ShellMain ---

export interface ReactShellMainProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
  children?: React.ReactNode
}

export const ShellMain = forwardRef<HTMLElement, ReactShellMainProps>(
  function ShellMain({ className, children, ...rest }, ref) {
    const classes = appShellMainClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <main ref={ref} className={combinedClassName} {...rest}>
        {children}
      </main>
    )
  },
)

// --- ShellFooter ---

export interface ReactShellFooterProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
  children?: React.ReactNode
}

export const ShellFooter = forwardRef<HTMLElement, ReactShellFooterProps>(
  function ShellFooter({ className, children, ...rest }, ref) {
    const classes = appShellFooterClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <footer ref={ref} className={combinedClassName} {...rest}>
        {children}
      </footer>
    )
  },
)
