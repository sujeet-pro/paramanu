const SKIP_BASE = "pm-skip-nav"
const TARGET_BASE = "pm-skip-nav-target"

/**
 * Returns the BEM class name for the skip navigation link.
 *
 * The skip nav link is visually hidden until focused, then appears
 * as a fixed-position link in the top-left corner of the viewport.
 * Follows WCAG 2.4.1 bypass blocks requirement.
 *
 * @returns The `"pm-skip-nav"` class string
 *
 * @example
 * ```html
 * <a href="#main-content" class="pm-skip-nav">Skip to content</a>
 * ```
 */
export function skipNavClasses(): string {
  return SKIP_BASE
}

/**
 * Returns the BEM class name for the skip navigation target element.
 *
 * Applied to the landmark that receives focus when the skip nav link
 * is activated. Adds `scroll-margin-top` so the target is not hidden
 * behind a sticky header.
 *
 * @returns The `"pm-skip-nav-target"` class string
 *
 * @example
 * ```html
 * <main id="main-content" class="pm-skip-nav-target">...</main>
 * ```
 */
export function skipNavTargetClasses(): string {
  return TARGET_BASE
}

/**
 * Returns the CSS module mapped class name for the skip navigation link.
 *
 * @param classMap - CSS modules class name mapping object
 * @returns Mapped class string, or empty string if not found
 */
export function skipNavModuleClasses(classMap: Record<string, string>): string {
  return classMap["pm-skip-nav"] ?? ""
}

/**
 * Returns the CSS module mapped class name for the skip navigation target.
 *
 * @param classMap - CSS modules class name mapping object
 * @returns Mapped class string, or empty string if not found
 */
export function skipNavTargetModuleClasses(classMap: Record<string, string>): string {
  return classMap["pm-skip-nav-target"] ?? ""
}
