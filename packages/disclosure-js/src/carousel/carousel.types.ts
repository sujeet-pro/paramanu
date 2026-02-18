export type CarouselOrientation = "horizontal" | "vertical"
export type CarouselSize = "sm" | "md" | "lg"

export interface CarouselClassesOptions {
  orientation?: CarouselOrientation
  size?: CarouselSize
}

export interface CarouselSlideClassesOptions {
  active?: boolean
}

export interface CarouselControlClassesOptions {
  direction: "prev" | "next"
  disabled?: boolean
}

export interface CarouselIndicatorClassesOptions {
  active?: boolean
}
