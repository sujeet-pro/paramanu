export type BackToTopSize = "sm" | "md" | "lg"

export type BackToTopPosition = "bottom-right" | "bottom-left" | "bottom-center"

export interface BackToTopClassesOptions {
  size?: BackToTopSize
  position?: BackToTopPosition
  visible?: boolean
}

export interface BackToTopProps extends BackToTopClassesOptions {}
