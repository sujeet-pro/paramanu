/** Selection mode for the toggle group */
export type ToggleGroupType = "single" | "multiple"

/** Layout orientation for the toggle group */
export type ToggleGroupOrientation = "horizontal" | "vertical"

/** Size preset shared across all items in the toggle group */
export type ToggleGroupSize = "xs" | "sm" | "md" | "lg" | "xl"

/** Visual style variant for toggle group items */
export type ToggleGroupVariant = "default" | "outline"

/**
 * Options for generating toggle group container CSS class names.
 * Used by both BEM (`toggleGroupClasses`) and CSS module (`toggleGroupModuleClasses`) builders.
 */
export interface ToggleGroupClassesOptions {
  /** Layout direction. @default "horizontal" */
  orientation?: ToggleGroupOrientation
  /** Shared size for all items. @default "md" */
  size?: ToggleGroupSize
  /** Whether items are visually attached with shared borders. @default false */
  attached?: boolean
  /** Whether the group should stretch to fill its container width. @default false */
  fullWidth?: boolean
}

/**
 * Options for generating toggle group item CSS class names.
 * Used by both BEM (`toggleGroupItemClasses`) and CSS module (`toggleGroupItemModuleClasses`) builders.
 */
export interface ToggleGroupItemClassesOptions {
  /** Shared size inherited from the group or set per-item. @default "md" */
  size?: ToggleGroupSize
  /** Visual style variant. @default "default" */
  variant?: ToggleGroupVariant
  /** Whether this item is in the pressed/on state. @default false */
  pressed?: boolean
  /** Whether this item is in a disabled state. @default false */
  disabled?: boolean
}
