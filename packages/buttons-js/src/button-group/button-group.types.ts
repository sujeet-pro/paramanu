/** Layout orientation for the button group */
export type ButtonGroupOrientation = "horizontal" | "vertical"

/**
 * Options for generating button group CSS class names.
 * Used by both BEM (`buttonGroupClasses`) and CSS module (`buttonGroupModuleClasses`) builders.
 */
export interface ButtonGroupClassesOptions {
  /** Layout direction. @default "horizontal" */
  orientation?: ButtonGroupOrientation
  /** Whether buttons are visually attached with shared borders. @default false */
  attached?: boolean
  /** Whether the group should stretch to fill its container width. @default false */
  fullWidth?: boolean
}
