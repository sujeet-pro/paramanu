import { createContext, useContext } from "react"
import type { CollapsibleSize } from "@paramanu/disclosure-js"

export interface CollapsibleContextValue {
  isOpen: boolean
  toggle: () => void
  disabled: boolean
  size: CollapsibleSize
  contentId: string
  triggerId: string
}

export const CollapsibleContext = createContext<CollapsibleContextValue | null>(null)

export function useCollapsibleContext(): CollapsibleContextValue {
  const context = useContext(CollapsibleContext)
  if (!context) {
    throw new Error("Collapsible compound components must be used within <Collapsible>")
  }
  return context
}
