export type PresenceState = "entering" | "entered" | "exiting" | "exited"

export interface PresenceOptions {
  duration?: number
  onEntered?: () => void
  onExited?: () => void
}

export interface PresenceInstance {
  state: PresenceState
  setPresent: (present: boolean) => void
  destroy: () => void
}

export interface PresenceClassesOptions {
  state?: PresenceState
}
