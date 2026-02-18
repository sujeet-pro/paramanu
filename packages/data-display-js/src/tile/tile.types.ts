export type TileVariant = "outline" | "filled" | "ghost"

export type TileSize = "sm" | "md" | "lg"

export interface TileClassesOptions {
  variant?: TileVariant
  size?: TileSize
  selected?: boolean
  disabled?: boolean
}
