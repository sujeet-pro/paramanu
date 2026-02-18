export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

export type AvatarVariant = "circle" | "square"

export type AvatarColor = "primary" | "neutral" | "danger" | "success"

export interface AvatarClassesOptions {
  size?: AvatarSize
  variant?: AvatarVariant
  color?: AvatarColor
}

export interface AvatarClassesResult {
  root: string
  image: string
  fallback: string
}

export interface AvatarProps extends AvatarClassesOptions {
  src?: string
  alt?: string
  name?: string
}
