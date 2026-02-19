/** Layout orientation for the button group */
export type BtnGroupOrientation = "horizontal" | "vertical"

/**
 * Options for generating button group CSS class names.
 * Used by both BEM (`btnGroupClasses`) and CSS module (`btnGroupModuleClasses`) builders.
 */
export interface BtnGroupClassesOptions {
  /** Layout direction. @default "horizontal" */
  orientation?: BtnGroupOrientation
  /** Whether buttons are visually attached with shared borders. @default false */
  attached?: boolean
  /** Whether the group should stretch to fill its container width. @default false */
  fullWidth?: boolean
}
