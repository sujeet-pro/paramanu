import type { PortalOptions, PortalInstance } from "./portal.types.js"

/**
 * Creates an imperative portal that appends a container `<div>` to the
 * specified target element. Content can then be mounted into this container,
 * effectively rendering it outside of its original DOM position.
 *
 * The container is marked with `data-pm-portal` for easy identification.
 *
 * For React usage, prefer the `<Portal>` component from
 * `@paramanu/utilities-react` which uses `ReactDOM.createPortal`.
 *
 * @param options - Configuration options
 * @returns A `PortalInstance` with `mount`, `unmount`, and `destroy` methods
 * @throws When a string target selector does not match any element
 *
 * @example
 * ```ts
 * const portal = createPortal({ target: "#modal-root" })
 * const content = document.createElement("div")
 * content.textContent = "Portal content"
 * portal.mount(content)
 *
 * // Later, clean up:
 * portal.destroy()
 * ```
 */
export function createPortal(options: PortalOptions = {}): PortalInstance {
  const { target = "body" } = options

  let targetElement: HTMLElement | null
  if (typeof target === "string") {
    targetElement = document.querySelector<HTMLElement>(target)
    if (!targetElement) {
      throw new Error(`[paramanu] Portal target "${target}" not found`)
    }
  } else {
    targetElement = target
  }

  const container = document.createElement("div")
  container.setAttribute("data-pm-portal", "")
  targetElement.appendChild(container)

  function mount(content: HTMLElement): void {
    container.appendChild(content)
  }

  function unmount(): void {
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }
  }

  function destroy(): void {
    unmount()
    container.remove()
  }

  return { container, mount, unmount, destroy }
}
