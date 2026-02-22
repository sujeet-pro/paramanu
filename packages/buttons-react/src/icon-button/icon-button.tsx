import { forwardRef } from "react"
import { iconBtnClasses } from "@paramanu/buttons-js"
import type { IconBtnProps } from "@paramanu/buttons-js"

export interface ReactIconBtnProps
  extends IconBtnProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type" | "aria-label"> {
  /**
   * Accessible label for the icon button (required).
   * Since icon buttons have no visible text, an aria-label is mandatory.
   */
  "aria-label": string
  /** Icon element to render inside the button. */
  children?: React.ReactNode
  /** Custom spinner element to show when loading. */
  spinner?: React.ReactNode
}

/**
 * A square/circular button that renders only an icon with no visible text.
 * Requires `aria-label` for accessibility. Shares the same variant and size
 * scale as `Btn` but uses equal width and height dimensions.
 *
 * @example
 * ```tsx
 * <IconBtn aria-label="Search" variant="ghost">
 *   <SearchIcon />
 * </IconBtn>
 * ```
 */
export const IconBtn = forwardRef<HTMLButtonElement, ReactIconBtnProps>(function IconBtn(
  { variant, size, shape, disabled, loading, active, className, children, spinner, ...rest },
  ref,
) {
  const classes = iconBtnClasses({ variant, size, shape, disabled, loading, active })
  const combinedClassName = className ? `${classes} ${className}` : classes
  const isDisabled = disabled || loading

  const spinnerElement = spinner ?? (
    <span className="pm-icon-btn__spinner" aria-hidden="true">
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    </span>
  )

  return (
    <button
      ref={ref}
      type="button"
      className={combinedClassName}
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? spinnerElement : children}
    </button>
  )
})
