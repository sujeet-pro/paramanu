export type ScrollDirection = "vertical" | "horizontal" | "both"

export type ScrollbarVisibility = "auto" | "always" | "hover"

export interface ScrollAreaClassesOptions {
  direction?: ScrollDirection
  scrollbar?: ScrollbarVisibility
}

export interface ScrollAreaProps extends ScrollAreaClassesOptions {}
