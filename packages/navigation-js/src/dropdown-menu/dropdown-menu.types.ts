/** Size preset for the dropdown menu */
export type DropdownMenuSize = "sm" | "md" | "lg"

/**
 * Options for generating dropdown menu CSS class names.
 * Used by both BEM (`dropdownMenuClasses`) and CSS module (`dropdownMenuModuleClasses`) builders.
 */
export interface DropdownMenuClassesOptions {
  /** Size preset controlling font-size. @default "md" */
  size?: DropdownMenuSize
  /** Whether the dropdown menu content is currently visible. @default false */
  open?: boolean
}
