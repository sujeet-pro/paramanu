/** Size preset for the menu component */
export type MenuSize = "sm" | "md" | "lg"

/**
 * Options for generating menu container CSS class names.
 * Used by both BEM (`menuClasses`) and CSS module (`menuModuleClasses`) builders.
 */
export interface MenuClassesOptions {
  /** Size preset controlling padding and font-size. @default "md" */
  size?: MenuSize
}

/**
 * Options for generating menu item CSS class names.
 */
export interface MenuItemClassesOptions {
  /** Whether this item is the currently active/highlighted item. @default false */
  active?: boolean
  /** Whether this item is in a disabled, non-interactive state. @default false */
  disabled?: boolean
  /** Whether this item represents a destructive/dangerous action. @default false */
  destructive?: boolean
}
