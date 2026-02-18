export type TourPlacement = "top" | "bottom" | "left" | "right"

export interface TourClassesOptions {
  open?: boolean
}

export interface TourStepClassesOptions {
  placement?: TourPlacement
  active?: boolean
}

export interface TourOverlayClassesOptions {
  visible?: boolean
}
