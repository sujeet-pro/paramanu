/**
 * Options for generating skip navigation link CSS class names.
 * Used by both BEM (`skipLinkClasses`) and CSS module (`skipLinkModuleClasses`) builders.
 */
export interface SkipLinkClassesOptions {}

/**
 * Full props interface for the skip navigation link component.
 * Renders a visually hidden link that becomes visible on focus,
 * allowing keyboard users to skip repetitive navigation content.
 */
export interface SkipLinkProps extends SkipLinkClassesOptions {
  /** The target element ID to skip to. @default "#main-content" */
  href?: string
}
