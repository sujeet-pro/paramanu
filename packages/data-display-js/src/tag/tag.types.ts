/** Visual style variant for the tag. */
export type TagVariant = "filled" | "outline" | "subtle"

/** Size controlling padding and font size. */
export type TagSize = "sm" | "md" | "lg"

/** Color palette applied to the tag. */
export type TagColor = "primary" | "neutral" | "danger" | "success"

/** Options for generating tag CSS class names. */
export interface TagClassesOptions {
  /** Visual style variant. @default "filled" */
  variant?: TagVariant
  /** Controls padding and font size. @default "md" */
  size?: TagSize
  /** Color palette. @default "primary" */
  color?: TagColor
  /** Shows a remove (close) button alongside the label. @default false */
  removable?: boolean
  /** Enables hover/focus interactive states. @default false */
  interactive?: boolean
  /** Disables interaction and reduces opacity. @default false */
  disabled?: boolean
}

/**
 * Object containing BEM class names for each tag sub-element.
 */
export interface TagClassesResult {
  /** Class for the outermost `<span>` element. */
  root: string
  /** Class for the remove `<button>` element. */
  remove: string
}

/** Props for the Tag component. */
export interface TagProps extends TagClassesOptions {}
