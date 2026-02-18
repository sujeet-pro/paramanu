/** Visual style of the tile. */
export type TileVariant = "outline" | "filled" | "ghost"

/** Size controlling padding and font size. */
export type TileSize = "sm" | "md" | "lg"

/** Options for generating tile CSS class names. */
export interface TileClassesOptions {
  /** Visual style variant. @default "outline" */
  variant?: TileVariant
  /** Controls padding and font size. @default "md" */
  size?: TileSize
  /** Indicates the tile is in a selected / active state. @default false */
  selected?: boolean
  /** Disables pointer interaction and reduces opacity. @default false */
  disabled?: boolean
}

/** Props for the Tile component. */
export interface TileProps extends TileClassesOptions {}
