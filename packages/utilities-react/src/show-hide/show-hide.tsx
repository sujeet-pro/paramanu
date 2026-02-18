import { forwardRef } from "react"
import { showHideClasses } from "@paramanu/utilities-js"
import type { ShowHideClassesOptions } from "@paramanu/utilities-js"

/**
 * Props for the `ShowHide` React component.
 *
 * A CSS-driven visibility toggle that uses `display: none` / `display: revert`.
 * Unlike conditional rendering (`{show && <Child />}`), the element remains
 * in the DOM when hidden, preserving state and scroll position.
 */
export interface ReactShowHideProps
  extends ShowHideClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  /** Content to show or hide. */
  children?: React.ReactNode
}

/**
 * A CSS-driven show/hide toggle component.
 *
 * Applies `pm-show` (visible) or `pm-hide` (`display: none`) classes.
 * The element stays in the DOM when hidden, which preserves internal
 * component state, form values, and scroll positions.
 *
 * For conditional rendering that removes elements from the DOM,
 * use standard React conditional rendering patterns instead.
 *
 * @example
 * ```tsx
 * <ShowHide display={isVisible ? "show" : "hide"}>
 *   <div>Content that toggles visibility</div>
 * </ShowHide>
 * ```
 */
export const ShowHide = forwardRef<HTMLDivElement, ReactShowHideProps>(function ShowHide(
  { display, className, children, ...rest },
  ref,
) {
  const classes = showHideClasses({ display })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
