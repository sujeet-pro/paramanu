import { useState, useEffect, useRef, useCallback } from "react"
import { createPresence } from "@paramanu/utilities-js"
import type { PresenceState, PresenceOptions, PresenceInstance } from "@paramanu/utilities-js"

/**
 * Options for the `usePresence` hook.
 *
 * Controls the presence lifecycle of an element, enabling CSS-driven
 * enter/exit animations before the element is removed from the DOM.
 */
export interface UsePresenceOptions extends PresenceOptions {
  /**
   * Whether the element should be present (visible).
   * Changing from `true` to `false` starts the exit animation.
   */
  present: boolean
}

/**
 * Return value of the `usePresence` hook.
 */
export interface UsePresenceReturn {
  /** The current lifecycle state: `"entering"`, `"entered"`, `"exiting"`, or `"exited"`. */
  state: PresenceState

  /**
   * Whether the element should be in the DOM.
   * `true` for all states except `"exited"`.
   * Use this to conditionally render the element.
   */
  isPresent: boolean

  /**
   * A ref callback to attach to the animated element.
   * Sets up the presence controller and `data-pm-presence` attribute.
   */
  ref: React.RefCallback<HTMLElement>
}

/**
 * A hook that manages mount/unmount animation lifecycle.
 *
 * Controls when an element should be in the DOM by tracking a
 * four-state lifecycle: `entering` -> `entered` -> `exiting` -> `exited`.
 * The element stays in the DOM during the `exiting` phase so CSS
 * animations can complete before removal.
 *
 * Similar to Radix UI's `Presence` and Framer Motion's `AnimatePresence`.
 *
 * @param options - Configuration options including `present` toggle
 * @returns State, `isPresent` flag, and a ref callback
 *
 * @example
 * ```tsx
 * function AnimatedPanel({ open }) {
 *   const { state, isPresent, ref } = usePresence({
 *     present: open,
 *     duration: 300,
 *   })
 *
 *   if (!isPresent) return null
 *
 *   return (
 *     <div ref={ref} data-pm-presence={state}>
 *       Animated content
 *     </div>
 *   )
 * }
 * ```
 */
export function usePresence(options: UsePresenceOptions): UsePresenceReturn {
  const { present, duration, onEntered, onExited } = options
  const [state, setState] = useState<PresenceState>(present ? "entered" : "exited")
  const instanceRef = useRef<PresenceInstance | null>(null)
  const elementRef = useRef<HTMLElement | null>(null)

  const ref = useCallback(
    (node: HTMLElement | null) => {
      if (instanceRef.current) {
        instanceRef.current.destroy()
        instanceRef.current = null
      }

      elementRef.current = node
      if (!node) return

      const instance = createPresence(node, {
        duration,
        onEntered: () => {
          setState("entered")
          onEntered?.()
        },
        onExited: () => {
          setState("exited")
          onExited?.()
        },
      })
      instanceRef.current = instance

      if (present) {
        instance.setPresent(true)
        setState("entering")
      }
    },
    [duration, onEntered, onExited, present],
  )

  useEffect(() => {
    const instance = instanceRef.current
    if (!instance) return

    instance.setPresent(present)
    setState(present ? "entering" : "exiting")
  }, [present])

  useEffect(() => {
    return () => {
      instanceRef.current?.destroy()
    }
  }, [])

  return {
    state,
    isPresent: state !== "exited",
    ref,
  }
}

/**
 * Props for the `Presence` React component.
 */
export interface ReactPresenceProps extends Omit<UsePresenceOptions, "present"> {
  /**
   * Whether the children should be visible.
   * When changed to `false`, the exit animation plays before unmounting.
   */
  present: boolean

  /**
   * Content to render. Can be a React node or a render function that
   * receives the current `PresenceState` for custom animation logic.
   */
  children: React.ReactNode | ((state: PresenceState) => React.ReactNode)
}

/**
 * A component that controls mount/unmount animations for its children.
 *
 * Keeps children in the DOM during exit animations so CSS transitions
 * can complete before removal. Supports both regular children and
 * render-prop children for custom animation control.
 *
 * @example
 * ```tsx
 * // Simple usage
 * <Presence present={isOpen} duration={200}>
 *   <div className="panel">Content</div>
 * </Presence>
 *
 * // Render prop for custom animation logic
 * <Presence present={isOpen} duration={200}>
 *   {(state) => (
 *     <div className={`panel panel--${state}`}>
 *       Content
 *     </div>
 *   )}
 * </Presence>
 * ```
 */
export function Presence({ present, duration, onEntered, onExited, children }: ReactPresenceProps) {
  const { state, isPresent, ref } = usePresence({ present, duration, onEntered, onExited })

  if (!isPresent) return null

  if (typeof children === "function") {
    return <>{children(state)}</>
  }

  return (
    <div ref={ref} data-pm-presence={state}>
      {children}
    </div>
  )
}
