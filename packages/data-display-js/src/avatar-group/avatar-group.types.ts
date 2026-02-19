/** Size of avatars within the group (sets context font-size for em-based margins). */
export type AvatarGrpSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

/** Overlap spacing between avatars. */
export type AvatarGrpSpacing = "tight" | "normal"

/** Options for generating avatar group CSS class names. */
export interface AvatarGrpClassesOptions {
  /** Size context for child avatars. @default "md" */
  size?: AvatarGrpSize
  /** Controls how much avatars overlap. @default "normal" */
  spacing?: AvatarGrpSpacing
}

/**
 * Object containing BEM class names for avatar group sub-elements.
 */
export interface AvatarGrpClassesResult {
  /** Class for the outermost `<div role="group">` wrapper. */
  root: string
  /** Class for the overflow count indicator ("+N"). */
  overflow: string
}

/** Props for the AvatarGrp component. */
export interface AvatarGrpProps extends AvatarGrpClassesOptions {
  /** Maximum number of avatars to display before showing the overflow count. */
  max?: number
}
