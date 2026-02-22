import { forwardRef, useCallback, useId, useState } from "react"
import {
  accordionClasses,
  accordionItemClasses,
  accordionTriggerClasses,
  accordionContentClasses,
  accordionIconClasses,
} from "@paramanu/disclosure-js"
import type { AccordionVariant, AccordionSize, AccordionType } from "@paramanu/disclosure-js"
import {
  AccordionContext,
  AccordionItemContext,
  useAccordionContext,
  useAccordionItemContext,
} from "./accordion-context.js"

export interface ReactAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controlled array of currently open item values. */
  value?: string[]
  /** Array of initially open item values (uncontrolled). @default [] */
  defaultValue?: string[]
  /** Callback fired when the set of open items changes. */
  onValueChange?: (value: string[]) => void
  /** Controls whether one or many items can be open simultaneously. @default "single" */
  type?: AccordionType
  /** Whether all panels can be collapsed when type is "single". @default false */
  collapsible?: boolean
  /** @deprecated Use `type="multiple"` instead. Whether multiple items can be open. @default false */
  multiple?: boolean
  /** Visual style variant. @default "default" */
  variant?: AccordionVariant
  /** Size preset. @default "md" */
  size?: AccordionSize
  children?: React.ReactNode
}

export const Accordion = forwardRef<HTMLDivElement, ReactAccordionProps>(function Accordion(
  {
    value: controlledValue,
    defaultValue = [],
    onValueChange,
    type = "single",
    collapsible = false,
    multiple,
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

  // Support legacy `multiple` prop or new `type` prop
  const isMultiple = multiple ?? type === "multiple"

  const toggleItem = useCallback(
    (itemValue: string) => {
      let next: string[]
      if (currentValue.includes(itemValue)) {
        // When type is "single" and not collapsible, prevent closing the last open item
        if (!isMultiple && !collapsible) {
          return
        }
        next = currentValue.filter((v) => v !== itemValue)
      } else if (isMultiple) {
        next = [...currentValue, itemValue]
      } else {
        next = [itemValue]
      }
      if (!isControlled) setUncontrolledValue(next)
      onValueChange?.(next)
    },
    [currentValue, isMultiple, collapsible, isControlled, onValueChange],
  )

  const classes = accordionClasses({ variant, size })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <AccordionContext.Provider
      value={{ value: currentValue, toggleItem, multiple: isMultiple, collapsible, variant, size }}
    >
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
})

export interface ReactAccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique identifier for this item within the accordion. */
  value: string
  /** Whether this item is disabled and non-interactive. @default false */
  disabled?: boolean
  children?: React.ReactNode
}

export const AccordionItem = forwardRef<HTMLDivElement, ReactAccordionItemProps>(
  function AccordionItem(
    { value: itemValue, disabled = false, className, children, ...rest },
    ref,
  ) {
    const { value, variant } = useAccordionContext()
    const isOpen = value.includes(itemValue)

    const uniqueId = useId()
    const contentId = `pm-accordion-content-${uniqueId}`
    const triggerId = `pm-accordion-trigger-${uniqueId}`

    const classes = accordionItemClasses({ open: isOpen, disabled, variant })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <AccordionItemContext.Provider value={{ itemValue, isOpen, disabled, contentId, triggerId }}>
        <div
          ref={ref}
          className={combinedClassName}
          data-state={isOpen ? "open" : "closed"}
          {...rest}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    )
  },
)

export interface ReactAccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
  /** Whether to force mount the content (keep in DOM when closed). @default false */
  forceMount?: boolean
  children?: React.ReactNode
}

export const AccordionContent = forwardRef<HTMLDivElement, ReactAccordionContentProps>(
  function AccordionContent({ forceMount = false, className, children, ...rest }, ref) {
    const { size } = useAccordionContext()
    const { isOpen, contentId, triggerId } = useAccordionItemContext()

    const classes = accordionContentClasses({ open: isOpen, size })
    const combinedClassName = className ? `${classes} ${className}` : classes

    if (!forceMount && !isOpen) {
      return (
        <div
          ref={ref}
          id={contentId}
          role="region"
          aria-labelledby={triggerId}
          className={combinedClassName}
          data-state="closed"
          hidden
          {...rest}
        >
          <div className="pm-accordion__content-inner">{children}</div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        className={combinedClassName}
        data-state={isOpen ? "open" : "closed"}
        {...rest}
      >
        <div className="pm-accordion__content-inner">{children}</div>
      </div>
    )
  },
)

export interface ReactAccordionIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode
}

export const AccordionIcon = forwardRef<HTMLSpanElement, ReactAccordionIconProps>(
  function AccordionIcon({ className, children, ...rest }, ref) {
    const { isOpen } = useAccordionItemContext()

    const classes = accordionIconClasses({ open: isOpen })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <span ref={ref} aria-hidden="true" className={combinedClassName} {...rest}>
        {children ?? (
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        )}
      </span>
    )
  },
)
