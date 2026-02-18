import { useState, useEffect, useRef, useCallback } from "react"
import { createPresence } from "@paramanu/utilities-js"
import type { PresenceState, PresenceOptions, PresenceInstance } from "@paramanu/utilities-js"

export interface UsePresenceOptions extends PresenceOptions {
  present: boolean
}

export interface UsePresenceReturn {
  state: PresenceState
  isPresent: boolean
  ref: React.RefCallback<HTMLElement>
}

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

export interface ReactPresenceProps extends Omit<UsePresenceOptions, "present"> {
  present: boolean
  children: React.ReactNode | ((state: PresenceState) => React.ReactNode)
}

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
