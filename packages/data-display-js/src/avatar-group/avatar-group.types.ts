export type AvatarGroupSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

export type AvatarGroupSpacing = "tight" | "normal"

export interface AvatarGroupClassesOptions {
  size?: AvatarGroupSize
  spacing?: AvatarGroupSpacing
}

export interface AvatarGroupClassesResult {
  root: string
  overflow: string
}
