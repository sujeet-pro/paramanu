import { forwardRef, useCallback, useId, useState } from "react"
import {
  collapsibleClasses,
  collapsibleTriggerClasses,
  collapsibleContentClasses,
} from "@paramanu/disclosure-js"
import type { CollapsibleSize } from "@paramanu/disclosure-js"
import { CollapsibleContext, useCollapsibleContext } from "./collapsible-context.js"

export interface ReactCollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
  size?: CollapsibleSize
  children?: React.ReactNode
}

export const Collapsible = forwardRef<HTMLDivElement, ReactCollapsibleProps>(
  function Collapsible(
    { open: controlledOpen, defaultOpen = false, onOpenChange, disabled = false, size = "md", className, children, ...rest },
    ref,
  ) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
    const isControlled = controlledOpen !== undefined
    const isOpen = isControlled ? controlledOpen : uncontrolledOpen

    const uniqueId = useId()
    const contentId = `pm-collapsible-content-${uniqueId}`
    const triggerId = `pm-collapsible-trigger-${uniqueId}`

    const toggle = useCallback(() => {
      if (disabled) return
      const next = !isOpen
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next)
    }, [disabled, isOpen, isControlled, onOpenChange])

    const classes = collapsibleClasses({ open: isOpen, disabled, size })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <CollapsibleContext.Provider value={{ isOpen, toggle, disabled, size, contentId, triggerId }}>
        <div ref={ref} className={combinedClassName} {...rest}>
          {children}
        </div>
      </CollapsibleContext.Provider>
    )
  },
)

export interface ReactCollapsibleTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

export const CollapsibleTrigger = forwardRef<HTMLButtonElement, ReactCollapsibleTriggerProps>(
  function CollapsibleTrigger({ className, onClick, children, ...rest }, ref) {
    const { isOpen, toggle, disabled, size, contentId, triggerId } = useCollapsibleContext()

    const classes = collapsibleTriggerClasses({ open: isOpen, disabled, size })
    const combinedClassName = className ? `${classes} ${className}` : classes

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      toggle()
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

export interface ReactCollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const CollapsibleContent = forwardRef<HTMLDivElement, ReactCollapsibleContentProps>(
  function CollapsibleContent({ className, children, ...rest }, ref) {
    const { isOpen, size, contentId, triggerId } = useCollapsibleContext()

    const classes = collapsibleContentClasses({ open: isOpen, size })
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
        <div className="pm-collapsible__content-inner">{children}</div>
      </div>
    )
  },
)
