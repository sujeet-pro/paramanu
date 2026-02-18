import { forwardRef } from "react"
import { buttonClasses } from "@paramanu/buttons-js"
import type { ButtonProps } from "@paramanu/buttons-js"

export interface ReactButtonProps
  extends ButtonProps,
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
 * <Button variant="primary" size="md">Click me</Button>
 * <Button loading loadingText="Saving...">Save</Button>
 * <Button leftIcon={<SearchIcon />}>Search</Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ReactButtonProps>(function Button(
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
  const classes = buttonClasses({ variant, size, disabled, fullWidth, loading, active })
  const combinedClassName = className ? `${classes} ${className}` : classes
  const isDisabled = disabled || loading

  const spinnerElement = spinner ?? (
    <span className="pm-button__spinner" aria-hidden="true">
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
            <span className="pm-button__label">{loadingText}</span>
          </>
        ) : (
          <>
            <span className="pm-button__label">{loadingText}</span>
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
        {leftIcon && <span className="pm-button__icon" aria-hidden="true">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="pm-button__icon" aria-hidden="true">{rightIcon}</span>}
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
