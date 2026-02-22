import { forwardRef } from "react"
import { searchClasses, inputClasses } from "@paramanu/forms-js"
import type { SearchProps } from "@paramanu/forms-js"

export interface ReactSearchProps
  extends SearchProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  onClear?: () => void
  children?: React.ReactNode
}

export const Search = forwardRef<HTMLInputElement, ReactSearchProps>(function Search(
  { variant, size, disabled, invalid, fullWidth, onClear, className, value, ...rest },
  ref,
) {
  const wrapperClasses = searchClasses({ variant, size, invalid, disabled, fullWidth })
  const innerClasses = inputClasses({ variant, size, invalid, disabled })
  const combinedWrapperClassName = className ? `${wrapperClasses} ${className}` : wrapperClasses
  const showClear = value !== undefined && value !== ""

  return (
    <div className={combinedWrapperClassName} role="search">
      <span className="pm-search__icon" aria-hidden="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <input
        ref={ref}
        type="search"
        className={innerClasses}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        aria-disabled={disabled || undefined}
        value={value}
        {...rest}
      />
      {showClear && (
        <button
          type="button"
          className="pm-search__clear"
          aria-label="Clear search"
          onClick={onClear}
          disabled={disabled}
          tabIndex={-1}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  )
})
