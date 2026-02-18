export type CardVariant = "elevated" | "outline" | "filled" | "ghost"

export type CardSize = "sm" | "md" | "lg"

export type CardMediaPosition = "top" | "bottom" | "start" | "end"

export interface CardClassesOptions {
  variant?: CardVariant
  size?: CardSize
  interactive?: boolean
  fullWidth?: boolean
  horizontal?: boolean
}

export interface CardClassesResult {
  root: string
  header: string
  body: string
  footer: string
  media: string
}

export interface CardMediaClassesOptions {
  position?: CardMediaPosition
}

export interface CardProps extends CardClassesOptions {}
