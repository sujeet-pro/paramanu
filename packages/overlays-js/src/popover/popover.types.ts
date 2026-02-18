/** Placement of the popover relative to its trigger element. */
export type PopoverPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end"

/**
 * Options for generating popover CSS class names.
 * Used by both BEM (`popoverClasses`) and CSS module (`popoverModuleClasses`) builders.
 */
export interface PopoverClassesOptions {
  /** Placement of the popover relative to its trigger. @default "bottom" */
  placement?: PopoverPlacement
  /** Whether the popover includes an arrow. @default false */
  hasArrow?: boolean
}

/** Options for generating popover arrow CSS class names. */
export interface PopoverArrowClassesOptions {}

/**
 * Options for creating a vanilla JS popover instance.
 */
export interface CreatePopoverOptions {
  /** Placement relative to the trigger element. @default "bottom" */
  placement?: PopoverPlacement
  /** Distance in pixels between the trigger and the popover. @default 8 */
  offset?: number
  /** Callback invoked when the popover is closed. */
  onClose?: () => void
  /** Whether pressing Escape closes the popover. @default true */
  closeOnEscape?: boolean
  /** Whether clicking outside the popover closes it. @default true */
  closeOnOutsideClick?: boolean
  /** Whether focus should be trapped inside the popover. @default false */
  trapFocus?: boolean
}

/**
 * Imperative popover instance returned by `createPopover()`.
 */
export interface PopoverInstance {
  /** Opens the popover and positions it relative to the trigger. */
  open: () => void
  /** Closes the popover with exit animation. */
  close: () => void
  /** Recalculates the popover position (e.g., on scroll or resize). */
  updatePosition: () => void
  /** Fully destroys the instance and cleans up all listeners. */
  destroy: () => void
}
