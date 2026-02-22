import { forwardRef } from "react"
import { srOnlyClasses } from "@paramanu/utilities-js"
import type { SrOnlyClassesOptions } from "@paramanu/utilities-js"

/**
 * Props for the `SrOnly` React component.
 *
 * Visually hides content while keeping it accessible to screen readers.
 * Uses the clip-rect technique recommended by WebAIM.
 */
export interface ReactSrOnlyProps extends SrOnlyClassesOptions, React.HTMLAttributes<HTMLElement> {
  /**
   * The HTML element to render.
   *
   * @default "span"
   */
  as?: React.ElementType

  /** Content to visually hide but keep accessible to assistive technologies. */
  children?: React.ReactNode
}

/**
 * Visually hides its children from sighted users while keeping
 * the content accessible to screen readers and other assistive technologies.
 *
 * Uses the well-established clip-rect CSS technique. When `focusable`
 * is true, the element becomes visible upon receiving keyboard focus,
 * which is useful for skip navigation links.
 *
 * @example
 * ```tsx
 * // Hide supplementary text for screen readers
 * <SrOnly>Additional context for screen readers</SrOnly>
 *
 * // Focusable skip link
 * <SrOnly as="a" href="#main" focusable>
 *   Skip to content
 * </SrOnly>
 * ```
 */
export const SrOnly = forwardRef<HTMLElement, ReactSrOnlyProps>(function SrOnly(
  { as: Component = "span", focusable, className, children, ...rest },
  ref,
) {
  const classes = srOnlyClasses({ focusable })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <Component ref={ref} className={combinedClassName} {...rest}>
      {children}
    </Component>
  )
})
