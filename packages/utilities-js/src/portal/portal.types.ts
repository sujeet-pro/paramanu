export interface PortalOptions {
  target?: string | HTMLElement
}

export interface PortalInstance {
  container: HTMLDivElement
  mount: (content: HTMLElement) => void
  unmount: () => void
  destroy: () => void
}
