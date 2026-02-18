/** Visual style variant for the tabs component */
export type TabsVariant = "line" | "enclosed" | "pill"

/** Size preset for tabs */
export type TabsSize = "sm" | "md" | "lg"

/** Layout orientation for the tab list */
export type TabsOrientation = "horizontal" | "vertical"

/**
 * Options for generating tabs container CSS class names.
 * Used by both BEM (`tabsClasses`) and CSS module (`tabsModuleClasses`) builders.
 */
export interface TabsClassesOptions {
  /** Visual style variant. @default "line" */
  variant?: TabsVariant
  /** Size preset controlling padding and font-size. @default "md" */
  size?: TabsSize
  /** Layout direction for the tab list. @default "horizontal" */
  orientation?: TabsOrientation
  /** Whether tabs should stretch to fill the container width. @default false */
  fitted?: boolean
}

/**
 * Options for generating tab list CSS class names.
 * The tab list is the container that holds individual tabs.
 */
export interface TabListClassesOptions {}

/**
 * Options for generating individual tab CSS class names.
 */
export interface TabClassesOptions {
  /** Whether this tab is the currently selected tab. @default false */
  active?: boolean
  /** Whether this tab is in a disabled, non-interactive state. @default false */
  disabled?: boolean
}

/**
 * Options for generating tab panel CSS class names.
 * The tab panel displays the content associated with the selected tab.
 */
export interface TabPanelClassesOptions {}
