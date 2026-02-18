import { forwardRef } from "react"
import { skipNavClasses, skipNavTargetClasses } from "@paramanu/utilities-js"

/**
 * Props for the `SkipNav` React component.
 *
 * The skip navigation link is visually hidden until focused,
 * then appears as a prominent link to bypass repetitive navigation.
 */
export interface ReactSkipNavProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * The `id` of the target element to skip to.
   * Used as the `href` fragment (`#targetId`).
   *
   * @default "main-content"
   */
  targetId?: string

  /**
   * The link text displayed when the skip nav link is focused.
   *
   * @default "Skip to content"
   */
  children?: React.ReactNode
}

/**
 * An accessibility skip navigation link (WCAG 2.4.1 bypass blocks).
 *
 * Renders an `<a>` element that is visually hidden until it receives
 * keyboard focus. When focused, it appears as a prominent link in the
 * top-left corner of the viewport, allowing keyboard users to skip
 * repetitive navigation and jump directly to main content.
 *
 * Use with `<SkipNavTarget>` to mark the destination element.
 *
 * @example
 * ```tsx
 * <SkipNav />
 * <nav>...</nav>
 * <SkipNavTarget>
 *   <main>Page content</main>
 * </SkipNavTarget>
 * ```
 */
export const SkipNav = forwardRef<HTMLAnchorElement, ReactSkipNavProps>(function SkipNav(
  { targetId = "main-content", className, children, ...rest },
  ref,
) {
  const classes = skipNavClasses()
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <a ref={ref} href={`#${targetId}`} className={combinedClassName} {...rest}>
      {children ?? "Skip to content"}
    </a>
  )
})

/**
 * Props for the `SkipNavTarget` React component.
 */
export interface ReactSkipNavTargetProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The `id` that the `<SkipNav>` link points to.
   *
   * @default "main-content"
   */
  id?: string

  /** Content within the skip nav target landmark. */
  children?: React.ReactNode
}

/**
 * The target landmark for the skip navigation link.
 *
 * Renders a `<div>` with `tabIndex={-1}` so it can receive programmatic
 * focus when the skip nav link is activated. Includes `scroll-margin-top`
 * to prevent the target from being hidden behind a sticky header.
 *
 * @example
 * ```tsx
 * <SkipNav />
 * <nav>...</nav>
 * <SkipNavTarget>
 *   <main>Page content</main>
 * </SkipNavTarget>
 * ```
 */
export const SkipNavTarget = forwardRef<HTMLDivElement, ReactSkipNavTargetProps>(
  function SkipNavTarget({ id = "main-content", className, children, ...rest }, ref) {
    const classes = skipNavTargetClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div ref={ref} id={id} tabIndex={-1} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)
