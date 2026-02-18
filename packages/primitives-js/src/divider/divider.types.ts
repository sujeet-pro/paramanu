import type { SpacingScale } from "../shared.types.js"

/** Divider orientation. */
export type DividerOrientation = "horizontal" | "vertical"

/** Divider line style. */
export type DividerVariant = "solid" | "dashed" | "dotted"

/** Label placement for dividers with text. */
export type DividerLabelPosition = "start" | "center" | "end"

export interface DividerClassesOptions {
  /** Whether the divider is horizontal or vertical. Defaults to "horizontal". */
  orientation?: DividerOrientation
  /** Line style of the divider. Defaults to "solid". */
  variant?: DividerVariant
  /** Whether the divider has a label (text inside the line). */
  withLabel?: boolean
  /** Position of the label along the divider. Defaults to "center". */
  labelPosition?: DividerLabelPosition
  /** Vertical margin around a horizontal divider using the spacing scale. */
  my?: SpacingScale
}

export interface DividerProps extends DividerClassesOptions {}
