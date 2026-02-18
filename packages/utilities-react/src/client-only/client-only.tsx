import { useState, useEffect } from "react"

/**
 * A hook that returns `true` once the component has mounted on the client.
 *
 * Returns `false` during server-side rendering and on the initial
 * render (before `useEffect` runs), then `true` after hydration.
 * This prevents hydration mismatches when rendering browser-only content.
 *
 * @returns `true` after client-side mount, `false` during SSR
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isClient = useIsClient()
 *
 *   if (!isClient) return <Skeleton />
 *
 *   return <div>{window.innerWidth}px wide</div>
 * }
 * ```
 */
export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}

/**
 * Props for the `ClientOnly` React component.
 */
export interface ReactClientOnlyProps {
  /**
   * Content to render during SSR before client-side hydration.
   * Commonly a loading skeleton or placeholder.
   *
   * @default null
   */
  fallback?: React.ReactNode

  /** Content that will only render on the client after hydration. */
  children: React.ReactNode
}

/**
 * Renders its children only on the client side, after React hydration.
 *
 * During SSR (and the initial client render before `useEffect` runs),
 * the `fallback` is rendered instead. This prevents hydration mismatches
 * when using browser-only APIs like `window`, `localStorage`, or `document`.
 *
 * Useful for wrapping Portals, browser-only features, and components
 * that depend on the DOM.
 *
 * @example
 * ```tsx
 * <ClientOnly fallback={<Skeleton />}>
 *   <BrowserOnlyWidget />
 * </ClientOnly>
 *
 * <ClientOnly>
 *   <Portal>
 *     <Modal />
 *   </Portal>
 * </ClientOnly>
 * ```
 */
export function ClientOnly({ fallback = null, children }: ReactClientOnlyProps) {
  const isClient = useIsClient()

  if (!isClient) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
