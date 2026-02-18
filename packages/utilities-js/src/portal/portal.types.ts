/**
 * Options for creating an imperative portal instance.
 *
 * A portal renders content into a DOM node that exists outside of the
 * parent component's DOM hierarchy. This is useful for overlays, modals,
 * tooltips, and other floating UI elements that need to break out of
 * overflow/stacking context constraints.
 *
 * The portal container is a `<div>` with a `data-pm-portal` attribute
 * for easy identification and styling.
 *
 * @example
 * ```ts
 * // Render into document.body (default)
 * const portal = createPortal()
 *
 * // Render into a custom container
 * const portal = createPortal({ target: "#modal-root" })
 *
 * // Render into an HTMLElement
 * const portal = createPortal({ target: document.getElementById("app")! })
 * ```
 */
export interface PortalOptions {
  /**
   * The target element or CSS selector where the portal container will be appended.
   * If a string is provided, it is used as a `document.querySelector` argument.
   *
   * @default "body"
   */
  target?: string | HTMLElement
}

/**
 * An imperative portal instance returned by `createPortal()`.
 *
 * For React usage, prefer the `<Portal>` component from
 * `@paramanu/utilities-react` which uses `ReactDOM.createPortal` internally.
 */
export interface PortalInstance {
  /** The `<div data-pm-portal>` container element appended to the target. */
  container: HTMLDivElement

  /**
   * Appends content to the portal container.
   * @param content - The DOM element to mount
   */
  mount: (content: HTMLElement) => void

  /** Removes all children from the portal container. */
  unmount: () => void

  /** Removes all children and detaches the container from the DOM. */
  destroy: () => void
}
