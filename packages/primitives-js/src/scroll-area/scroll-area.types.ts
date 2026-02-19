/** Scroll direction for the scroll area. */
export type ScrollDirection = "vertical" | "horizontal" | "both"

/** Scrollbar visibility behavior. */
export type ScrollbarVisibility = "auto" | "always" | "hover" | "hidden"

/** Scrollbar width style. */
export type ScrollbarSize = "thin" | "none"

export interface ScrollClassesOptions {
  /** Which axes allow scrolling. Defaults to "vertical". */
  direction?: ScrollDirection
  /** When to show scrollbars. Defaults to "auto". */
  scrollbar?: ScrollbarVisibility
  /** Width of the scrollbar. Defaults to "thin". */
  scrollbarSize?: ScrollbarSize
  /** Whether the scroll area has a border. */
  bordered?: boolean
}

export interface ScrollProps extends ScrollClassesOptions {}
