/** Placement of the tour step popover relative to its target element */
export type TourPlacement =
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

/** Visual style variant for the tour step */
export type TourVariant = "default" | "primary"

/**
 * Options for generating tour root CSS class names.
 * Used by both BEM (`tourClasses`) and CSS module (`tourModuleClasses`) builders.
 */
export interface TourClassesOptions {
  /** Whether the tour is currently active/visible. @default false */
  open?: boolean
}

/**
 * Options for generating tour step popover CSS class names.
 */
export interface TourStepClassesOptions {
  /** Placement of the step relative to its target element. @default "bottom" */
  placement?: TourPlacement
  /** Whether this step is the currently active step. @default false */
  active?: boolean
  /** Visual style variant. @default "default" */
  variant?: TourVariant
}

/**
 * Options for generating tour overlay CSS class names.
 * The overlay dims the page behind the tour step.
 */
export interface TourOverlayClassesOptions {
  /** Whether the overlay is currently visible. @default false */
  visible?: boolean
}

/**
 * Options for generating tour spotlight CSS class names.
 * The spotlight highlights the target element through the overlay.
 */
export interface TourSpotlightClassesOptions {
  /** Whether the spotlight is currently visible. @default false */
  visible?: boolean
}

/**
 * Options for generating tour close button CSS class names.
 */
export interface TourCloseClassesOptions {
  /** Visual style variant inherited from the step. @default "default" */
  variant?: TourVariant
}

/**
 * Describes a single step in the tour sequence.
 */
export interface TourStepConfig {
  /** CSS selector or ref for the target element to highlight. */
  target: string
  /** Title text displayed in the step popover. */
  title?: string
  /** Description text displayed in the step popover. */
  description?: string
  /** Placement of the step popover relative to the target. @default "bottom" */
  placement?: TourPlacement
  /** Visual style variant for this specific step. @default "default" */
  variant?: TourVariant
}

/**
 * Full props interface for the tour component.
 * Extends class options with behavioral and HTML-specific attributes.
 */
export interface TourProps extends TourClassesOptions {
  /** Array of step configurations defining the tour sequence. */
  steps: TourStepConfig[]
  /** The index of the currently active step (controlled). */
  current?: number
  /** The initial step index (uncontrolled). @default 0 */
  defaultCurrent?: number
  /** Callback fired when the tour is closed. */
  onClose?: () => void
  /** Callback fired when the active step changes. */
  onChange?: (current: number) => void
  /** Callback fired when the tour completes (user clicks finish on last step). */
  onFinish?: () => void
  /** Whether clicking the overlay closes the tour. @default false */
  closeOnOverlayClick?: boolean
  /** Whether pressing Escape closes the tour. @default true */
  closeOnEsc?: boolean
  /** Whether to show the step counter (e.g., "2 of 5"). @default true */
  showCounter?: boolean
  /** Whether to show the close button on each step. @default true */
  showClose?: boolean
}
