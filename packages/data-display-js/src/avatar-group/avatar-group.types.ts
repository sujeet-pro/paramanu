/** Size of avatars within the group (sets context font-size for em-based margins). */
export type AvatarGroupSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

/** Overlap spacing between avatars. */
export type AvatarGroupSpacing = "tight" | "normal"

/** Options for generating avatar group CSS class names. */
export interface AvatarGroupClassesOptions {
  /** Size context for child avatars. @default "md" */
  size?: AvatarGroupSize
  /** Controls how much avatars overlap. @default "normal" */
  spacing?: AvatarGroupSpacing
}

/**
 * Object containing BEM class names for avatar group sub-elements.
 */
export interface AvatarGroupClassesResult {
  /** Class for the outermost `<div role="group">` wrapper. */
  root: string
  /** Class for the overflow count indicator ("+N"). */
  overflow: string
}

/** Props for the AvatarGroup component. */
export interface AvatarGroupProps extends AvatarGroupClassesOptions {
  /** Maximum number of avatars to display before showing the overflow count. */
  max?: number
}
