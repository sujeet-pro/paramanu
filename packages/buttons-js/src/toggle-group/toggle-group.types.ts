/** Selection mode for the toggle group */
export type ToggleGrpType = "single" | "multiple"

/** Layout orientation for the toggle group */
export type ToggleGrpOrientation = "horizontal" | "vertical"

/** Size preset shared across all items in the toggle group */
export type ToggleGrpSize = "xs" | "sm" | "md" | "lg" | "xl"

/** Visual style variant for toggle group items */
export type ToggleGrpVariant = "default" | "outline"

/**
 * Options for generating toggle group container CSS class names.
 * Used by both BEM (`toggleGrpClasses`) and CSS module (`toggleGrpModuleClasses`) builders.
 */
export interface ToggleGrpClassesOptions {
  /** Layout direction. @default "horizontal" */
  orientation?: ToggleGrpOrientation
  /** Shared size for all items. @default "md" */
  size?: ToggleGrpSize
  /** Whether items are visually attached with shared borders. @default false */
  attached?: boolean
  /** Whether the group should stretch to fill its container width. @default false */
  fullWidth?: boolean
}

/**
 * Options for generating toggle group item CSS class names.
 * Used by both BEM (`toggleGrpItemClasses`) and CSS module (`toggleGrpItemModuleClasses`) builders.
 */
export interface ToggleGrpItemClassesOptions {
  /** Shared size inherited from the group or set per-item. @default "md" */
  size?: ToggleGrpSize
  /** Visual style variant. @default "default" */
  variant?: ToggleGrpVariant
  /** Whether this item is in the pressed/on state. @default false */
  pressed?: boolean
  /** Whether this item is in a disabled state. @default false */
  disabled?: boolean
}
