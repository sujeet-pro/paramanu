export type AccordionVariant = "default" | "bordered" | "separated"

export type AccordionSize = "sm" | "md" | "lg"

export interface AccordionClassesOptions {
  variant?: AccordionVariant
  size?: AccordionSize
}

export interface AccordionItemClassesOptions {
  open?: boolean
  disabled?: boolean
  variant?: AccordionVariant
}

export interface AccordionTriggerClassesOptions {
  open?: boolean
  disabled?: boolean
  size?: AccordionSize
}

export interface AccordionContentClassesOptions {
  open?: boolean
  size?: AccordionSize
}
