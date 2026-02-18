/** Orientation/scroll direction of the carousel */
export type CarouselOrientation = "horizontal" | "vertical"

/** Size preset for the carousel controls and indicators */
export type CarouselSize = "sm" | "md" | "lg"

/** Alignment of slides within the viewport */
export type CarouselAlign = "start" | "center" | "end"

/**
 * Options for generating carousel root CSS class names.
 * Used by both BEM (`carouselClasses`) and CSS module (`carouselModuleClasses`) builders.
 */
export interface CarouselClassesOptions {
  /** Scroll direction of the carousel. @default "horizontal" */
  orientation?: CarouselOrientation
  /** Size preset controlling control buttons and indicators. @default "md" */
  size?: CarouselSize
  /** Whether to display navigation dots. @default true */
  showDots?: boolean
  /** Whether to display prev/next arrow controls. @default true */
  showArrows?: boolean
}

/**
 * Options for generating carousel viewport CSS class names.
 * The viewport is the visible area that clips the slide track.
 */
export interface CarouselViewportClassesOptions {
  /** Scroll direction for overflow handling. @default "horizontal" */
  orientation?: CarouselOrientation
}

/**
 * Options for generating carousel track CSS class names.
 * The track is the sliding container that holds all slides.
 */
export interface CarouselTrackClassesOptions {
  /** Layout direction for slides. @default "horizontal" */
  orientation?: CarouselOrientation
  /** Whether the track is currently being dragged. @default false */
  dragging?: boolean
}

/**
 * Options for generating carousel slide CSS class names.
 */
export interface CarouselSlideClassesOptions {
  /** Whether this slide is the currently active/visible slide. @default false */
  active?: boolean
}

/**
 * Options for generating carousel control (prev/next button) CSS class names.
 */
export interface CarouselControlClassesOptions {
  /** Direction the control navigates toward. */
  direction: "prev" | "next"
  /** Whether the control is disabled (e.g., at the start/end when loop is off). @default false */
  disabled?: boolean
}

/**
 * Options for generating carousel indicator dot CSS class names.
 */
export interface CarouselIndicatorClassesOptions {
  /** Whether this indicator represents the currently active slide. @default false */
  active?: boolean
}

/**
 * Full props interface for the carousel component.
 * Extends class options with behavioral and HTML-specific attributes.
 */
export interface CarouselProps extends CarouselClassesOptions {
  /** Whether the carousel automatically advances slides. @default false */
  autoplay?: boolean
  /** Interval in milliseconds between auto-advance transitions. @default 5000 */
  autoplayInterval?: number
  /** Whether the carousel loops back to the start after the last slide. @default false */
  loop?: boolean
  /** Number of slides visible in the viewport at once. @default 1 */
  slidesToShow?: number
  /** Number of slides to scroll per navigation action. @default 1 */
  slidesToScroll?: number
  /** Slide alignment within the viewport. @default "start" */
  align?: CarouselAlign
  /** The index of the currently active slide (controlled). */
  activeIndex?: number
  /** The initial active slide index (uncontrolled). @default 0 */
  defaultActiveIndex?: number
  /** Callback fired when the active slide changes. */
  onSlideChange?: (index: number) => void
}
