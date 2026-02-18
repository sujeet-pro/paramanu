/**
 * The lifecycle state of a presence-managed element.
 *
 * The state machine flows:
 * - `exited` -> `entering` -> `entered` (when becoming present)
 * - `entered` -> `exiting` -> `exited` (when leaving)
 *
 * This allows CSS animations/transitions to play during enter and exit
 * phases before the element is actually removed from the DOM.
 */
export type PresenceState = "entering" | "entered" | "exiting" | "exited"

/**
 * Options for creating an imperative presence instance.
 *
 * The presence pattern manages mount/unmount animations by controlling
 * when elements are added to and removed from the DOM. Instead of
 * immediately removing an element, it transitions through `exiting`
 * state first, allowing CSS animations to complete.
 *
 * Similar to Radix UI's `Presence`, Framer Motion's `AnimatePresence`,
 * and React Transition Group's state machine approach.
 *
 * @example
 * ```ts
 * const presence = createPresence(element, {
 *   duration: 300,
 *   onEntered: () => console.log("fully visible"),
 *   onExited: () => element.remove(),
 * })
 * presence.setPresent(true)  // starts entering animation
 * ```
 */
export interface PresenceOptions {
  /**
   * Duration in milliseconds for enter/exit transitions.
   * Should match the CSS animation/transition duration.
   *
   * @default 200
   */
  duration?: number

  /** Callback invoked when the enter transition completes (state becomes `"entered"`). */
  onEntered?: () => void

  /** Callback invoked when the exit transition completes (state becomes `"exited"`). */
  onExited?: () => void
}

/**
 * An imperative presence instance returned by `createPresence()`.
 *
 * For React usage, prefer the `usePresence` hook or `<Presence>` component
 * from `@paramanu/utilities-react`.
 */
export interface PresenceInstance {
  /** The current lifecycle state of the managed element. */
  state: PresenceState

  /**
   * Triggers an enter or exit transition.
   * @param present - `true` to enter, `false` to exit
   */
  setPresent: (present: boolean) => void

  /** Cleans up timers and removes the `data-pm-presence` attribute. */
  destroy: () => void
}

/**
 * Options for generating presence class names.
 * Used to apply state-based CSS classes for animation styling.
 */
export interface PresenceClassesOptions {
  /**
   * The current presence state to reflect in class names.
   * When omitted, only the base `pm-presence` class is returned.
   */
  state?: PresenceState
}
