import { forwardRef } from "react"
import { toggleGroupClasses, toggleGroupItemClasses } from "@paramanu/buttons-js"
import type {
  ToggleGroupClassesOptions,
  ToggleGroupItemClassesOptions,
} from "@paramanu/buttons-js"

export interface ReactToggleGroupProps
  extends ToggleGroupClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const ToggleGroup = forwardRef<HTMLDivElement, ReactToggleGroupProps>(
  function ToggleGroup(
    { orientation, size, attached, className, children, ...rest },
    ref,
  ) {
    const classes = toggleGroupClasses({ orientation, size, attached })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div
        ref={ref}
        role="group"
        className={combinedClassName}
        {...rest}
      >
        {children}
      </div>
    )
  },
)

export interface ReactToggleGroupItemProps
  extends ToggleGroupItemClassesOptions,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  children?: React.ReactNode
}

export const ToggleGroupItem = forwardRef<HTMLButtonElement, ReactToggleGroupItemProps>(
  function ToggleGroupItem(
    { size, pressed, disabled, className, children, ...rest },
    ref,
  ) {
    const classes = toggleGroupItemClasses({ size, pressed, disabled })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <button
        ref={ref}
        type="button"
        className={combinedClassName}
        disabled={disabled}
        aria-disabled={disabled || undefined}
        aria-pressed={pressed ?? false}
        {...rest}
      >
        {children}
      </button>
    )
  },
)
