import { createContext, useContext } from "react"
import type { AccordionVariant, AccordionSize } from "@paramanu/disclosure-js"

export interface AccordionContextValue {
  value: string[]
  toggleItem: (itemValue: string) => void
  multiple: boolean
  variant: AccordionVariant
  size: AccordionSize
}

export const AccordionContext = createContext<AccordionContextValue | null>(null)

export function useAccordionContext(): AccordionContextValue {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error("Accordion compound components must be used within <Accordion>")
  }
  return context
}

export interface AccordionItemContextValue {
  itemValue: string
  isOpen: boolean
  disabled: boolean
  contentId: string
  triggerId: string
}

export const AccordionItemContext = createContext<AccordionItemContextValue | null>(null)

export function useAccordionItemContext(): AccordionItemContextValue {
  const context = useContext(AccordionItemContext)
  if (!context) {
    throw new Error("AccordionTrigger/AccordionContent must be used within <AccordionItem>")
  }
  return context
}
