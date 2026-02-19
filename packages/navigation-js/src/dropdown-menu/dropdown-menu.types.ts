/** Size preset for the dropdown menu */
export type DropdownSize = "sm" | "md" | "lg"

/**
 * Options for generating dropdown menu CSS class names.
 * Used by both BEM (`dropdownClasses`) and CSS module (`dropdownModuleClasses`) builders.
 */
export interface DropdownClassesOptions {
  /** Size preset controlling font-size. @default "md" */
  size?: DropdownSize
  /** Whether the dropdown menu content is currently visible. @default false */
  open?: boolean
}
