/**
 * Props for the SkipNav link component.
 *
 * Skip navigation links are an accessibility best practice (WCAG 2.4.1)
 * that allow keyboard users to bypass repetitive navigation blocks and
 * jump directly to the main content. The link is visually hidden until
 * it receives keyboard focus, at which point it appears prominently.
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html
 *
 * @example
 * ```html
 * <a href="#main-content" class="pm-skip-nav">Skip to content</a>
 * <main id="main-content" class="pm-skip-nav-target">...</main>
 * ```
 */
export interface SkipNavProps {
  /**
   * The `id` of the element to skip to. Will be used as the `href` fragment.
   *
   * @default "main-content"
   */
  targetId?: string
}

/**
 * Props for the SkipNavTarget landmark component.
 *
 * The target element receives focus when the skip nav link is activated.
 * It should wrap or be the main content area of the page.
 */
export interface SkipNavTargetProps {
  /**
   * The `id` that the SkipNav link points to.
   *
   * @default "main-content"
   */
  id?: string
}
