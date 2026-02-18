import { forwardRef, useCallback, useId, useState } from "react"
import {
  accordionClasses,
  accordionItemClasses,
  accordionTriggerClasses,
  accordionContentClasses,
} from "@paramanu/disclosure-js"
import type { AccordionVariant, AccordionSize } from "@paramanu/disclosure-js"
import {
  AccordionContext,
  AccordionItemContext,
  useAccordionContext,
  useAccordionItemContext,
} from "./accordion-context.js"

export interface ReactAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  multiple?: boolean
  variant?: AccordionVariant
  size?: AccordionSize
  children?: React.ReactNode
}

export const Accordion = forwardRef<HTMLDivElement, ReactAccordionProps>(function Accordion(
  {
    value: controlledValue,
    defaultValue = [],
    onValueChange,
    multiple = false,
    variant = "default",
    size = "md",
    className,
    children,
    ...rest
  },
  ref,
) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const currentValue = isControlled ? controlledValue : uncontrolledValue

  const toggleItem = useCallback(
    (itemValue: string) => {
      let next: string[]
      if (currentValue.includes(itemValue)) {
        next = currentValue.filter((v) => v !== itemValue)
      } else if (multiple) {
        next = [...currentValue, itemValue]
      } else {
        next = [itemValue]
      }
      if (!isControlled) setUncontrolledValue(next)
      onValueChange?.(next)
    },
    [currentValue, multiple, isControlled, onValueChange],
  )

  const classes = accordionClasses({ variant, size })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <AccordionContext.Provider value={{ value: currentValue, toggleItem, multiple, variant, size }}>
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
})

export interface ReactAccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  disabled?: boolean
  children?: React.ReactNode
}

export const AccordionItem = forwardRef<HTMLDivElement, ReactAccordionItemProps>(
  function AccordionItem({ value: itemValue, disabled = false, className, children, ...rest }, ref) {
    const { value, variant } = useAccordionContext()
    const isOpen = value.includes(itemValue)

    const uniqueId = useId()
    const contentId = `pm-accordion-content-${uniqueId}`
    const triggerId = `pm-accordion-trigger-${uniqueId}`

    const classes = accordionItemClasses({ open: isOpen, disabled, variant })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <AccordionItemContext.Provider
        value={{ itemValue, isOpen, disabled, contentId, triggerId }}
      >
        <div ref={ref} className={combinedClassName} {...rest}>
          {children}
        </div>
      </AccordionItemContext.Provider>
    )
  },
)

export interface ReactAccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

export const AccordionTrigger = forwardRef<HTMLButtonElement, ReactAccordionTriggerProps>(
  function AccordionTrigger({ className, onClick, children, ...rest }, ref) {
    const { toggleItem, size } = useAccordionContext()
    const { itemValue, isOpen, disabled, contentId, triggerId } = useAccordionItemContext()

    const classes = accordionTriggerClasses({ open: isOpen, disabled, size })
    const combinedClassName = className ? `${classes} ${className}` : classes

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) toggleItem(itemValue)
      onClick?.(e)
    }

    return (
      <button
        ref={ref}
        type="button"
        id={triggerId}
        className={combinedClassName}
        aria-expanded={isOpen}
        aria-controls={contentId}
        disabled={disabled}
        aria-disabled={disabled || undefined}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </button>
    )
  },
)

export interface ReactAccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const AccordionContent = forwardRef<HTMLDivElement, ReactAccordionContentProps>(
  function AccordionContent({ className, children, ...rest }, ref) {
    const { size } = useAccordionContext()
    const { isOpen, contentId, triggerId } = useAccordionItemContext()

    const classes = accordionContentClasses({ open: isOpen, size })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div
        ref={ref}
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        className={combinedClassName}
        {...rest}
      >
        <div className="pm-accordion__content-inner">{children}</div>
      </div>
    )
  },
)
