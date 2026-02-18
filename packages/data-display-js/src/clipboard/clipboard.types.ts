/** Size controlling padding and icon size. */
export type ClipboardSize = "sm" | "md" | "lg"

/** Options for generating clipboard CSS class names. */
export interface ClipboardClassesOptions {
  /** Controls padding and font size. @default "md" */
  size?: ClipboardSize
  /** Whether the copy action has been completed (shows success state). @default false */
  copied?: boolean
}

/** Props for the Clipboard component. */
export interface ClipboardProps extends ClipboardClassesOptions {
  /** The text value to copy to the clipboard when clicked. */
  value?: string
  /** Duration in milliseconds to show the copied state before resetting. @default 2000 */
  timeout?: number
}
