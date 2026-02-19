import { forwardRef } from "react"
import { toggleBtnClasses } from "@paramanu/buttons-js"
import type { ToggleBtnProps } from "@paramanu/buttons-js"

export interface ReactToggleBtnProps
  extends ToggleBtnProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type" | "value" | "onChange"> {
  /** Content to render inside the toggle button. */
  children?: React.ReactNode
  /** Callback fired when the toggle state changes. */
  onChange?: (pressed: boolean) => void
}

/**
 * A two-state toggle button that can be on (pressed) or off.
 * Uses `aria-pressed` for accessibility. The label must remain the same
 * regardless of the pressed state per WAI-ARIA best practices.
 *
 * @example
 * ```tsx
 * const [bold, setBold] = useState(false)
 * <ToggleBtn pressed={bold} onChange={setBold}>Bold</ToggleBtn>
 * ```
 */
export const ToggleBtn = forwardRef<HTMLButtonElement, ReactToggleBtnProps>(
  function ToggleBtn(
    {
      variant,
      size,
      pressed,
      disabled,
      fullWidth,
      value,
      className,
      children,
      onChange,
      onClick,
      ...rest
    },
    ref,
  ) {
    const classes = toggleBtnClasses({ variant, size, pressed, disabled, fullWidth })
    const combinedClassName = className ? `${classes} ${className}` : classes

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (!e.defaultPrevented) {
        onChange?.(!pressed)
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        className={combinedClassName}
        disabled={disabled}
        aria-disabled={disabled || undefined}
        aria-pressed={pressed ?? false}
        data-value={value}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </button>
    )
  },
)
