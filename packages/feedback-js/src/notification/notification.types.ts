/** Visual status variant for the notification. */
export type NotifVariant = "info" | "success" | "warning" | "danger" | "neutral"

/** Options for generating notification class names. */
export interface NotifClassesOptions {
  /** The status variant of the notification. Determines color accent.
   * @default "neutral"
   */
  variant?: NotifVariant

  /** Whether the notification has not been read yet.
   * @default false
   */
  unread?: boolean

  /** Whether the notification can be dismissed via a close button.
   * @default false
   */
  dismissible?: boolean
}
