import { forwardRef } from "react"
import { btnClasses } from "@paramanu/buttons-js"
import type { BtnProps } from "@paramanu/buttons-js"

export interface ReactBtnProps
  extends BtnProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /** The HTML button type attribute. @default "button" */
  type?: "button" | "submit" | "reset"
  /** Content to render inside the button. */
  children?: React.ReactNode
  /** Element to render on the left side of the button label (e.g., icon). */
  leftIcon?: React.ReactNode
  /** Element to render on the right side of the button label (e.g., icon). */
  rightIcon?: React.ReactNode
  /** Custom spinner element to show when loading. */
  spinner?: React.ReactNode
}

/**
 * A polymorphic button component supporting multiple variants, sizes,
 * loading state with spinner, and icon slots.
 *
 * @example
 * ```tsx
 * <Btn variant="primary" size="md">Click me</Btn>
 * <Btn loading loadingText="Saving...">Save</Btn>
 * <Btn leftIcon={<SearchIcon />}>Search</Btn>
 * ```
 */
export const Btn = forwardRef<HTMLButtonElement, ReactBtnProps>(function Btn(
  {
    variant,
    size,
    disabled,
    fullWidth,
    loading,
    active,
    loadingText,
    spinnerPlacement = "start",
    type = "button",
    className,
    children,
    leftIcon,
    rightIcon,
    spinner,
    ...rest
  },
  ref,
) {
  const classes = btnClasses({ variant, size, disabled, fullWidth, loading, active })
  const combinedClassName = className ? `${classes} ${className}` : classes
  const isDisabled = disabled || loading

  const spinnerElement = spinner ?? (
    <span className="pm-btn__spinner" aria-hidden="true">
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

  const renderContent = () => {
    if (loading) {
      if (loadingText) {
        return spinnerPlacement === "start" ? (
          <>
            {spinnerElement}
            <span className="pm-btn__label">{loadingText}</span>
          </>
        ) : (
          <>
            <span className="pm-btn__label">{loadingText}</span>
            {spinnerElement}
          </>
        )
      }

      return (
        <>
          {spinnerElement}
          <span style={{ visibility: "hidden", height: 0, overflow: "hidden" }}>
            {children}
          </span>
        </>
      )
    }

    return (
      <>
        {leftIcon && <span className="pm-btn__icon" aria-hidden="true">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="pm-btn__icon" aria-hidden="true">{rightIcon}</span>}
      </>
    )
  }

  return (
    <button
      ref={ref}
      type={type}
      className={combinedClassName}
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
      {...rest}
    >
      {renderContent()}
    </button>
  )
})
