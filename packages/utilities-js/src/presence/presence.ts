import type { PresenceOptions, PresenceInstance, PresenceState } from "./presence.types.js"

/**
 * Creates an imperative presence controller that manages enter/exit
 * animation lifecycle for the given element.
 *
 * The presence sets `data-pm-presence` attribute on the element with
 * the current state value (`"entering"`, `"entered"`, `"exiting"`),
 * enabling CSS-driven animations. The attribute is removed in the
 * `"exited"` state.
 *
 * State machine:
 * ```
 * setPresent(true)   -> "entering" -> (after duration) -> "entered"
 * setPresent(false)  -> "exiting"  -> (after duration) -> "exited"
 * ```
 *
 * Rapid toggling is handled gracefully: setting a new state cancels
 * any pending timer from the previous transition.
 *
 * For React usage, prefer the `usePresence` hook or `<Presence>` component
 * from `@paramanu/utilities-react`.
 *
 * @param element - The DOM element to manage presence state for
 * @param options - Configuration options
 * @returns A `PresenceInstance` with `state`, `setPresent`, and `destroy`
 *
 * @example
 * ```ts
 * const presence = createPresence(dialogEl, {
 *   duration: 300,
 *   onExited: () => dialogEl.remove(),
 * })
 *
 * // Show with animation
 * presence.setPresent(true)
 *
 * // Hide with exit animation
 * presence.setPresent(false)
 * ```
 */
export function createPresence(
  element: HTMLElement,
  options: PresenceOptions = {},
): PresenceInstance {
  const { duration = 200, onEntered, onExited } = options

  let currentState: PresenceState = "exited"
  let timer: ReturnType<typeof setTimeout> | null = null

  function setState(state: PresenceState): void {
    currentState = state
    if (state === "exited") {
      element.removeAttribute("data-pm-presence")
    } else {
      element.setAttribute("data-pm-presence", state)
    }
  }

  function clearTimer(): void {
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }
  }

  function setPresent(present: boolean): void {
    clearTimer()

    if (present) {
      setState("entering")
      timer = setTimeout(() => {
        setState("entered")
        onEntered?.()
      }, duration)
    } else {
      setState("exiting")
      timer = setTimeout(() => {
        setState("exited")
        onExited?.()
      }, duration)
    }
  }

  function destroy(): void {
    clearTimer()
    element.removeAttribute("data-pm-presence")
  }

  const instance: PresenceInstance = {
    get state() {
      return currentState
    },
    setPresent,
    destroy,
  }

  return instance
}
