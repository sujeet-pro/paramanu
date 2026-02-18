import { forwardRef, useRef, useEffect } from "react"
import { createFocusTrap } from "@paramanu/utilities-js"
import type { FocusTrapOptions, FocusTrapInstance } from "@paramanu/utilities-js"

/**
 * Options for the `useFocusTrap` hook.
 *
 * Extends the vanilla JS focus trap options with an `active` toggle
 * for controlling when the trap is engaged.
 */
export interface UseFocusTrapOptions extends FocusTrapOptions {
  /**
   * Whether the focus trap is currently active.
   * When `true`, focus is constrained within the ref element.
   *
   * @default true
   */
  active?: boolean
}

/**
 * A React hook that creates and manages a focus trap on the referenced element.
 *
 * Returns a ref to attach to the container element. The trap activates
 * automatically when `active` is `true` and the ref is attached to a DOM element.
 *
 * Used internally by Dialog, Drawer, and other overlay components.
 *
 * @param options - Configuration options
 * @returns A ref object to attach to the trap container element
 *
 * @example
 * ```tsx
 * function Dialog({ open, onClose, children }) {
 *   const trapRef = useFocusTrap({
 *     active: open,
 *     onEscapeKey: onClose,
 *   })
 *
 *   return open ? (
 *     <div ref={trapRef} role="dialog" aria-modal="true">
 *       {children}
 *     </div>
 *   ) : null
 * }
 * ```
 */
export function useFocusTrap<T extends HTMLElement = HTMLDivElement>(
  options: UseFocusTrapOptions = {},
): React.RefObject<T | null> {
  const { active = true, initialFocus, returnFocusOnDeactivate, onEscapeKey } = options
  const ref = useRef<T | null>(null)
  const instanceRef = useRef<FocusTrapInstance | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const instance = createFocusTrap(el, {
      initialFocus,
      returnFocusOnDeactivate,
      onEscapeKey,
    })
    instanceRef.current = instance

    if (active) instance.activate()

    return () => {
      instance.destroy()
      instanceRef.current = null
    }
  }, [active, initialFocus, returnFocusOnDeactivate, onEscapeKey])

  return ref
}

/**
 * Props for the `FocusTrap` React component.
 */
export interface ReactFocusTrapProps
  extends UseFocusTrapOptions,
    React.HTMLAttributes<HTMLDivElement> {
  /** Content to render within the focus trap container. */
  children?: React.ReactNode
}

/**
 * A component that traps keyboard focus within its children.
 *
 * Renders a `<div>` wrapper and constrains Tab/Shift+Tab navigation
 * to focusable elements within it. Essential for accessible modal
 * dialogs, drawers, and popovers.
 *
 * For more control, use the `useFocusTrap` hook directly.
 *
 * @example
 * ```tsx
 * <FocusTrap active={isOpen} onEscapeKey={onClose}>
 *   <div role="dialog" aria-modal="true">
 *     <button>First focusable</button>
 *     <button>Last focusable</button>
 *   </div>
 * </FocusTrap>
 * ```
 */
export const FocusTrap = forwardRef<HTMLDivElement, ReactFocusTrapProps>(function FocusTrap(
  { active, initialFocus, returnFocusOnDeactivate, onEscapeKey, className, children, ...rest },
  ref,
) {
  const trapRef = useFocusTrap<HTMLDivElement>({
    active,
    initialFocus,
    returnFocusOnDeactivate,
    onEscapeKey,
  })

  return (
    <div
      ref={(node) => {
        ;(trapRef as React.MutableRefObject<HTMLDivElement | null>).current = node
        if (typeof ref === "function") ref(node)
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
      }}
      className={className}
      {...rest}
    >
      {children}
    </div>
  )
})
