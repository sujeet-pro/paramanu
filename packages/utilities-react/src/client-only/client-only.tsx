import { useState, useEffect } from "react"

export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}

export interface ReactClientOnlyProps {
  fallback?: React.ReactNode
  children: React.ReactNode
}

export function ClientOnly({ fallback = null, children }: ReactClientOnlyProps) {
  const isClient = useIsClient()

  if (!isClient) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
