export type TagVariant = "filled" | "outline" | "subtle"

export type TagSize = "sm" | "md" | "lg"

export type TagColor = "primary" | "neutral" | "danger" | "success"

export interface TagClassesOptions {
  variant?: TagVariant
  size?: TagSize
  color?: TagColor
  removable?: boolean
  interactive?: boolean
  disabled?: boolean
}

export interface TagClassesResult {
  root: string
  remove: string
}
