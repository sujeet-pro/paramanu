/** Placement of the drawer relative to the viewport edge. */
export type DrawerPlacement = "start" | "end" | "top" | "bottom"

/** Size preset for the drawer panel. */
export type DrawerSize = "sm" | "md" | "lg" | "xl" | "full"

/**
 * Options for generating drawer CSS class names.
 * Used by both BEM (`drawerClasses`) and CSS module (`drawerModuleClasses`) builders.
 */
export interface DrawerClassesOptions {
  /** Which edge of the viewport the drawer slides in from. @default "end" */
  placement?: DrawerPlacement
  /** Size of the drawer (width for start/end, height for top/bottom). @default "md" */
  size?: DrawerSize
}

/** Options for generating drawer header CSS class names. */
export interface DrawerHeaderClassesOptions {}

/** Options for generating drawer body CSS class names. */
export interface DrawerBodyClassesOptions {}

/** Options for generating drawer footer CSS class names. */
export interface DrawerFooterClassesOptions {}

/**
 * Options for creating a vanilla JS drawer instance.
 */
export interface CreateDrawerOptions {
  /** Callback invoked when the drawer is closed. */
  onClose?: () => void
  /** Element or CSS selector to receive initial focus when the drawer opens. */
  initialFocus?: HTMLElement | string
  /** Whether clicking the backdrop closes the drawer. @default true */
  closeOnBackdropClick?: boolean
  /** Whether pressing Escape closes the drawer. @default true */
  closeOnEscape?: boolean
}

/**
 * Imperative drawer instance returned by `createDrawer()`.
 */
export interface DrawerInstance {
  /** Opens the drawer with slide-in animation. */
  open: () => void
  /** Closes the drawer with slide-out animation. */
  close: () => void
  /** Fully destroys the instance and cleans up all listeners. */
  destroy: () => void
}
