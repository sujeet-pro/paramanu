/** Size of the avatar (maps to width/height and font size). */
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

/** Shape of the avatar. */
export type AvatarVariant = "circle" | "square"

/** Background color palette for the initials/icon fallback. */
export type AvatarColor = "primary" | "neutral" | "danger" | "success"

/** Options for generating avatar CSS class names. */
export interface AvatarClassesOptions {
  /** Size controlling width, height, and font size. @default "md" */
  size?: AvatarSize
  /** Shape of the avatar. @default "circle" */
  variant?: AvatarVariant
  /** Background color for the fallback state. @default "primary" */
  color?: AvatarColor
}

/**
 * Object containing BEM class names for each avatar sub-element.
 */
export interface AvatarClassesResult {
  /** Class for the outermost `<span>` wrapper. */
  root: string
  /** Class for the `<img>` element when a `src` is provided. */
  image: string
  /** Class for the fallback `<span>` showing initials or an icon. */
  fallback: string
}

/** Props for the Avatar component. */
export interface AvatarProps extends AvatarClassesOptions {
  /** Img URL for the avatar. When absent, the fallback is shown. */
  src?: string
  /** Accessible alt text for the image. */
  alt?: string
  /** Full name used to derive initials for the fallback display. */
  name?: string
}
