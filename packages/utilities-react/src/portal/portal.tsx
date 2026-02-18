import { useState, useEffect } from "react"
import { createPortal } from "react-dom"

/**
 * Props for the `Portal` React component.
 *
 * Renders children into a DOM node outside the parent component's
 * DOM hierarchy using `ReactDOM.createPortal`.
 */
export interface ReactPortalProps {
  /**
   * The target element or CSS selector to render the portal into.
   * If a string is provided, it is used as a `document.querySelector` argument.
   *
   * @default "body"
   */
  target?: string | HTMLElement

  /**
   * When `true`, renders children in-place without portalling.
   * Useful for disabling the portal behavior conditionally (e.g. in SSR).
   *
   * @default false
   */
  disabled?: boolean

  /** The content to render through the portal. */
  children: React.ReactNode
}

/**
 * Renders its children into a separate DOM node outside the current
 * component tree, using `ReactDOM.createPortal` under the hood.
 *
 * By default, content is appended to `document.body`. The portal
 * container is a `<div>` with a `data-pm-portal` attribute for
 * easy identification and styling.
 *
 * Useful for overlays, modals, tooltips, and toasts that need to
 * break out of overflow/stacking context constraints.
 *
 * @example
 * ```tsx
 * // Default portal to body
 * <Portal>
 *   <div className="modal">Modal content</div>
 * </Portal>
 *
 * // Portal to a specific container
 * <Portal target="#modal-root">
 *   <div className="modal">Modal content</div>
 * </Portal>
 *
 * // Disable portal (render in-place)
 * <Portal disabled>
 *   <div>Rendered in-place</div>
 * </Portal>
 * ```
 */
export function Portal({ target = "body", disabled, children }: ReactPortalProps) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (disabled) return

    let targetElement: HTMLElement | null
    if (typeof target === "string") {
      targetElement = document.querySelector<HTMLElement>(target)
    } else {
      targetElement = target
    }

    if (!targetElement) return

    const div = document.createElement("div")
    div.setAttribute("data-pm-portal", "")
    targetElement.appendChild(div)
    setContainer(div)

    return () => {
      div.remove()
      setContainer(null)
    }
  }, [target, disabled])

  if (disabled) {
    return <>{children}</>
  }

  if (!container) return null

  return createPortal(children, container)
}
