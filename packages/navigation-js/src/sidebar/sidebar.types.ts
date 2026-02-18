export type SidebarWidth = "narrow" | "default" | "wide"

export type SidebarPosition = "left" | "right"

export interface SidebarClassesOptions {
  width?: SidebarWidth
  collapsed?: boolean
  position?: SidebarPosition
}

export interface SidebarItemClassesOptions {
  active?: boolean
  disabled?: boolean
  indent?: 0 | 1 | 2 | 3
}
