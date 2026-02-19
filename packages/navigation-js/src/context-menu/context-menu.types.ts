/** Size preset for the context menu */
export type CtxMenuSize = "sm" | "md" | "lg"

/**
 * Options for generating context menu CSS class names.
 * Used by both BEM (`ctxMenuClasses`) and CSS module (`ctxMenuModuleClasses`) builders.
 * The context menu appears on right-click and shares ARIA patterns with dropdown menus.
 */
export interface CtxMenuClassesOptions {
  /** Size preset controlling font-size. @default "md" */
  size?: CtxMenuSize
  /** Whether the context menu is currently visible. @default false */
  open?: boolean
}
