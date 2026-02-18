export type AppShellSidebarWidth = "sm" | "md" | "lg"
export type AppShellSidebarPosition = "start" | "end"

export interface AppShellClassesOptions {
  sidebarCollapsed?: boolean
  sidebarPosition?: AppShellSidebarPosition
}

export interface AppShellHeaderClassesOptions {
  sticky?: boolean
}

export interface AppShellSidebarClassesOptions {
  width?: AppShellSidebarWidth
  collapsed?: boolean
}

export interface AppShellProps extends AppShellClassesOptions {}

export interface AppShellHeaderProps extends AppShellHeaderClassesOptions {}

export interface AppShellSidebarProps extends AppShellSidebarClassesOptions {}

export interface AppShellMainProps {}

export interface AppShellFooterProps {}
