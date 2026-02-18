export type TabsVariant = "line" | "enclosed" | "pill"

export type TabsSize = "sm" | "md" | "lg"

export type TabsOrientation = "horizontal" | "vertical"

export interface TabsClassesOptions {
  variant?: TabsVariant
  size?: TabsSize
  orientation?: TabsOrientation
  fitted?: boolean
}

export interface TabListClassesOptions {}

export interface TabClassesOptions {
  active?: boolean
  disabled?: boolean
}

export interface TabPanelClassesOptions {}
