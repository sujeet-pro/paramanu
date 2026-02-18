/**
 * Options for generating skip navigation link CSS class names.
 * Used by both BEM (`skipNavLinkClasses`) and CSS module (`skipNavLinkModuleClasses`) builders.
 */
export interface SkipNavLinkClassesOptions {}

/**
 * Full props interface for the skip navigation link component.
 * Renders a visually hidden link that becomes visible on focus,
 * allowing keyboard users to skip repetitive navigation content.
 */
export interface SkipNavLinkProps extends SkipNavLinkClassesOptions {
  /** The target element ID to skip to. @default "#main-content" */
  href?: string
}
