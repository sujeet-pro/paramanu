import { forwardRef, createContext, useContext, useState, useCallback } from "react"
import {
  appShellClasses,
  appShellHeaderClasses,
  appShellSidebarClasses,
  appShellMainClasses,
  appShellFooterClasses,
} from "@paramanu/primitives-js"
import type {
  AppShellProps,
  AppShellHeaderProps,
  AppShellSidebarProps,
  AppShellSidebarWidth,
} from "@paramanu/primitives-js"

interface AppShellContextValue {
  sidebarCollapsed: boolean
  toggleSidebar: () => void
}

const AppShellContext = createContext<AppShellContextValue>({
  sidebarCollapsed: false,
  toggleSidebar: () => {},
})

function useAppShellContext() {
  return useContext(AppShellContext)
}

// --- AppShell (container) ---

export interface ReactAppShellProps
  extends AppShellProps,
    React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
  defaultSidebarCollapsed?: boolean
  onSidebarToggle?: (collapsed: boolean) => void
}

export const AppShell = forwardRef<HTMLDivElement, ReactAppShellProps>(function AppShell(
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

  const classes = appShellClasses({ sidebarCollapsed: collapsed, sidebarPosition })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <AppShellContext.Provider value={{ sidebarCollapsed: collapsed, toggleSidebar }}>
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    </AppShellContext.Provider>
  )
})

// --- AppShellHeader ---

export interface ReactAppShellHeaderProps
  extends AppShellHeaderProps,
    React.HTMLAttributes<HTMLElement> {
  className?: string
  children?: React.ReactNode
}

export const AppShellHeader = forwardRef<HTMLElement, ReactAppShellHeaderProps>(
  function AppShellHeader({ sticky, className, children, ...rest }, ref) {
    const classes = appShellHeaderClasses({ sticky })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <header ref={ref} className={combinedClassName} {...rest}>
        {children}
      </header>
    )
  },
)

// --- AppShellSidebar ---

export interface ReactAppShellSidebarProps
  extends AppShellSidebarProps,
    React.HTMLAttributes<HTMLElement> {
  className?: string
  children?: React.ReactNode
}

export const AppShellSidebar = forwardRef<HTMLElement, ReactAppShellSidebarProps>(
  function AppShellSidebar(
    { width = "md" as AppShellSidebarWidth, collapsed: propCollapsed, className, children, ...rest },
    ref,
  ) {
    const { sidebarCollapsed } = useAppShellContext()
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

// --- AppShellMain ---

export interface ReactAppShellMainProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
  children?: React.ReactNode
}

export const AppShellMain = forwardRef<HTMLElement, ReactAppShellMainProps>(
  function AppShellMain({ className, children, ...rest }, ref) {
    const classes = appShellMainClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <main ref={ref} className={combinedClassName} {...rest}>
        {children}
      </main>
    )
  },
)

// --- AppShellFooter ---

export interface ReactAppShellFooterProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
  children?: React.ReactNode
}

export const AppShellFooter = forwardRef<HTMLElement, ReactAppShellFooterProps>(
  function AppShellFooter({ className, children, ...rest }, ref) {
    const classes = appShellFooterClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <footer ref={ref} className={combinedClassName} {...rest}>
        {children}
      </footer>
    )
  },
)
