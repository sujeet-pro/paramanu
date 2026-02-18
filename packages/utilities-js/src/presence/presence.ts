import type { PresenceOptions, PresenceInstance, PresenceState } from "./presence.types.js"

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
