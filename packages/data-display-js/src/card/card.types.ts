/** Visual style of the card container. */
export type CardVariant = "elevated" | "outline" | "filled" | "ghost"

/** Padding size of the card. */
export type CardSize = "sm" | "md" | "lg"

/** Position of the media element within the card. */
export type CardMediaPosition = "top" | "bottom" | "start" | "end"

/** Options for generating card CSS class names. */
export interface CardClassesOptions {
  /** Visual style variant of the card. @default "elevated" */
  variant?: CardVariant
  /** Controls the internal padding of the card. @default "md" */
  size?: CardSize
  /** When true, the card responds to hover/focus interactions (pointer, shadow lift). @default false */
  interactive?: boolean
  /** Stretches the card to fill its parent width. @default false */
  fullWidth?: boolean
  /** Arranges the card content in a horizontal (row) layout. @default false */
  horizontal?: boolean
}

/**
 * Object containing BEM class names for each card sub-element.
 * Compound components should apply these classes to the corresponding DOM nodes.
 */
export interface CardClassesResult {
  /** Class for the outermost card wrapper. */
  root: string
  /** Class for the card header section. */
  header: string
  /** Class for the card body / main content area. */
  body: string
  /** Class for the card footer section. */
  footer: string
  /** Class for the card media container. */
  media: string
}

/** Options for generating card media position class names. */
export interface CardMediaClassesOptions {
  /** Where the media element is placed relative to the card content. @default "top" */
  position?: CardMediaPosition
}

/** Props for the Card component (extends class options). */
export interface CardProps extends CardClassesOptions {}
