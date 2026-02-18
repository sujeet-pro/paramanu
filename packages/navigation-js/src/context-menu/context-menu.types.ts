/** Size preset for the context menu */
export type ContextMenuSize = "sm" | "md" | "lg"

/**
 * Options for generating context menu CSS class names.
 * Used by both BEM (`contextMenuClasses`) and CSS module (`contextMenuModuleClasses`) builders.
 * The context menu appears on right-click and shares ARIA patterns with dropdown menus.
 */
export interface ContextMenuClassesOptions {
  /** Size preset controlling font-size. @default "md" */
  size?: ContextMenuSize
  /** Whether the context menu is currently visible. @default false */
  open?: boolean
}
