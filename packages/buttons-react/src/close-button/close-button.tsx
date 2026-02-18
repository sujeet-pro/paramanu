import { forwardRef } from "react"
import { closeButtonClasses } from "@paramanu/buttons-js"
import type { CloseButtonProps } from "@paramanu/buttons-js"

export interface ReactCloseButtonProps
  extends CloseButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /**
   * Custom icon element to render inside the close button.
   * Defaults to an SVG x-mark if not provided.
   */
  children?: React.ReactNode
}

/**
 * A small dismiss/close button intended for alerts, dialogs, toasts,
 * and other dismissible containers. Renders a close icon (x-mark) by default.
 *
 * @example
 * ```tsx
 * <CloseButton aria-label="Close dialog" />
 * <CloseButton size="sm" onClick={onDismiss} />
 * ```
 */
export const CloseButton = forwardRef<HTMLButtonElement, ReactCloseButtonProps>(
  function CloseButton({ size, disabled, className, children, ...rest }, ref) {
    const classes = closeButtonClasses({ size, disabled })
    const combinedClassName = className ? `${classes} ${className}` : classes

    const defaultIcon = (
      <svg
        className="pm-close-button__icon"
        aria-hidden="true"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    )

    return (
      <button
        ref={ref}
        type="button"
        className={combinedClassName}
        disabled={disabled}
        aria-disabled={disabled || undefined}
        aria-label={rest["aria-label"] ?? "Close"}
        {...rest}
      >
        {children ?? defaultIcon}
      </button>
    )
  },
)
