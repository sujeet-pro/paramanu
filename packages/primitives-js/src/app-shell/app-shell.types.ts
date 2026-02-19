export type ShellSidebarWidth = "sm" | "md" | "lg"
export type ShellSidebarPosition = "start" | "end"

export interface ShellClassesOptions {
  sidebarCollapsed?: boolean
  sidebarPosition?: ShellSidebarPosition
}

export interface ShellHeaderClassesOptions {
  sticky?: boolean
}

export interface ShellSidebarClassesOptions {
  width?: ShellSidebarWidth
  collapsed?: boolean
}

export interface ShellProps extends ShellClassesOptions {}

export interface ShellHeaderProps extends ShellHeaderClassesOptions {}

export interface ShellSidebarProps extends ShellSidebarClassesOptions {}

export interface ShellMainProps {}

export interface ShellFooterProps {}
