/**
 * Options for generating visually hidden class names.
 *
 * Visually hidden elements are removed from the visual flow but remain
 * accessible to assistive technologies such as screen readers.
 * Uses the clip-rect technique recommended by WebAIM.
 *
 * @example
 * ```ts
 * // Hide text from sighted users
 * srOnlyClasses()
 * // => "pm-sr-only"
 *
 * // Allow the element to become visible when focused (e.g. skip links)
 * srOnlyClasses({ focusable: true })
 * // => "pm-sr-only pm-sr-only--focusable"
 * ```
 */
export interface SrOnlyClassesOptions {
  /**
   * When `true`, the element becomes visible when it receives focus.
   * Useful for skip navigation links and other keyboard-only controls.
   *
   * @default false
   */
  focusable?: boolean
}

/**
 * Props for the SrOnly component.
 * Extends class options with semantic HTML attributes.
 */
export interface SrOnlyProps extends SrOnlyClassesOptions {
  /**
   * The HTML element to render.
   *
   * @default "span"
   */
  as?: string
}
