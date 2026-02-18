import type { PortalOptions, PortalInstance } from "./portal.types.js"

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
