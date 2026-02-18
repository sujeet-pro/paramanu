/**
 * Options for creating a focus trap instance.
 *
 * A focus trap constrains keyboard focus within a container element,
 * preventing users from tabbing outside of it. This is essential for
 * accessible modal dialogs, drawers, and other overlay components.
 *
 * Follows the WAI-ARIA dialog pattern for focus management:
 * - Focus moves to the first focusable element (or `initialFocus`) on activation
 * - Tab/Shift+Tab cycles through focusable descendants
 * - Focus returns to the previously focused element on deactivation
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 *
 * @example
 * ```ts
 * const trap = createFocusTrap(dialogElement, {
 *   initialFocus: "#confirm-button",
 *   returnFocusOnDeactivate: true,
 *   onEscapeKey: () => closeDialog(),
 * })
 * trap.activate()
 * // ... later
 * trap.deactivate()
 * ```
 */
export interface FocusTrapOptions {
  /**
   * The element or CSS selector to receive initial focus when the trap activates.
   * If not provided, the first focusable element within the container is focused.
   * If a selector is given, it is queried within the trap container element.
   *
   * @default undefined (first focusable element)
   */
  initialFocus?: HTMLElement | string

  /**
   * Whether to return focus to the previously focused element when the trap
   * is deactivated. This is important for accessibility so users don't lose
   * their place in the page.
   *
   * @default true
   */
  returnFocusOnDeactivate?: boolean

  /**
   * Callback invoked when the Escape key is pressed inside the trap.
   * Commonly used to close the containing dialog or overlay.
   */
  onEscapeKey?: () => void
}

/**
 * A focus trap instance returned by `createFocusTrap()`.
 * Provides imperative control over the trap lifecycle.
 */
export interface FocusTrapInstance {
  /**
   * Activates the focus trap, moving focus into the container
   * and attaching the keydown listener for Tab/Escape handling.
   */
  activate: () => void

  /**
   * Deactivates the focus trap, removing the keydown listener
   * and optionally restoring focus to the previously focused element.
   */
  deactivate: () => void

  /**
   * Permanently destroys the trap, deactivating it and clearing
   * all internal references. Safe to call multiple times.
   */
  destroy: () => void
}
