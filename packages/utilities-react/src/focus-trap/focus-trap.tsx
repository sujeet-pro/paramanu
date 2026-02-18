import { forwardRef, useRef, useEffect } from "react"
import { createFocusTrap } from "@paramanu/utilities-js"
import type { FocusTrapOptions, FocusTrapInstance } from "@paramanu/utilities-js"

export interface UseFocusTrapOptions extends FocusTrapOptions {
  active?: boolean
}

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

export interface ReactFocusTrapProps
  extends UseFocusTrapOptions,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

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
