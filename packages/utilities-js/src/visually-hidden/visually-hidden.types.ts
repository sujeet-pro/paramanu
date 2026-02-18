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
 * visuallyHiddenClasses()
 * // => "pm-visually-hidden"
 *
 * // Allow the element to become visible when focused (e.g. skip links)
 * visuallyHiddenClasses({ focusable: true })
 * // => "pm-visually-hidden pm-visually-hidden--focusable"
 * ```
 */
export interface VisuallyHiddenClassesOptions {
  /**
   * When `true`, the element becomes visible when it receives focus.
   * Useful for skip navigation links and other keyboard-only controls.
   *
   * @default false
   */
  focusable?: boolean
}

/**
 * Props for the VisuallyHidden component.
 * Extends class options with semantic HTML attributes.
 */
export interface VisuallyHiddenProps extends VisuallyHiddenClassesOptions {
  /**
   * The HTML element to render.
   *
   * @default "span"
   */
  as?: string
}
