import { forwardRef, useCallback } from "react"
import { toggleGrpClasses, toggleGrpItemClasses } from "@paramanu/buttons-js"
import type {
  ToggleGrpType,
  ToggleGrpClassesOptions,
  ToggleGrpItemClassesOptions,
} from "@paramanu/buttons-js"

export interface ReactToggleGrpProps
  extends ToggleGrpClassesOptions, Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Selection mode: "single" allows one item, "multiple" allows many. @default "single" */
  type?: ToggleGrpType
  /**
   * Currently selected value(s).
   * For type="single": a string or undefined.
   * For type="multiple": an array of strings.
   */
  value?: string | string[]
  /** Callback fired when the selection changes. */
  onChange?: (value: string | string[]) => void
  /** Content (ToggleGrpItem elements). */
  children?: React.ReactNode
}

/**
 * A group of toggle buttons where one or more can be active depending
 * on the selection type. Implements WAI-ARIA group pattern with
 * roving tabindex for keyboard navigation.
 *
 * @example
 * ```tsx
 * <ToggleGrp type="single" value={alignment} onChange={setAlignment}>
 *   <ToggleGrpItem value="left">Left</ToggleGrpItem>
 *   <ToggleGrpItem value="center">Center</ToggleGrpItem>
 *   <ToggleGrpItem value="right">Right</ToggleGrpItem>
 * </ToggleGrp>
 * ```
 */
export const ToggleGrp = forwardRef<HTMLDivElement, ReactToggleGrpProps>(function ToggleGrp(
  {
    type = "single",
    orientation,
    size,
    attached,
    fullWidth,
    value,
    onChange,
    className,
    children,
    ...rest
  },
  ref,
) {
  const classes = toggleGrpClasses({ orientation, size, attached, fullWidth })
  const combinedClassName = className ? `${classes} ${className}` : classes

  const handleItemClick = useCallback(
    (itemValue: string) => {
      if (!onChange) return

      if (type === "single") {
        onChange(value === itemValue ? "" : itemValue)
      } else {
        const currentValues = Array.isArray(value) ? value : []
        if (currentValues.includes(itemValue)) {
          onChange(currentValues.filter((v) => v !== itemValue))
        } else {
          onChange([...currentValues, itemValue])
        }
      }
    },
    [type, value, onChange],
  )

  const isPressed = useCallback(
    (itemValue: string): boolean => {
      if (type === "single") {
        return value === itemValue
      }
      return Array.isArray(value) ? value.includes(itemValue) : false
    },
    [type, value],
  )

  return (
    <div
      ref={ref}
      role="group"
      className={combinedClassName}
      data-type={type}
      data-orientation={orientation ?? "horizontal"}
      {...rest}
    >
      {typeof children === "object" && children !== null
        ? (Array.isArray(children) ? children : [children]).map((child) => {
            if (
              child &&
              typeof child === "object" &&
              "props" in child &&
              child.props?.value != null
            ) {
              const itemValue = String(child.props.value)
              return {
                ...child,
                props: {
                  ...child.props,
                  pressed: isPressed(itemValue),
                  onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                    child.props?.onClick?.(e)
                    if (!e.defaultPrevented) {
                      handleItemClick(itemValue)
                    }
                  },
                },
              }
            }
            return child
          })
        : children}
    </div>
  )
})

export interface ReactToggleGrpItemProps
  extends
    ToggleGrpItemClassesOptions,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type" | "value"> {
  /** The value associated with this item (used for selection tracking). */
  value?: string
  /** Content to render inside the toggle item. */
  children?: React.ReactNode
}

/**
 * An individual item within a ToggleGrp. Renders a toggle button
 * with `aria-pressed` to indicate the selected state.
 *
 * @example
 * ```tsx
 * <ToggleGrpItem value="bold">B</ToggleGrpItem>
 * ```
 */
export const ToggleGrpItem = forwardRef<HTMLButtonElement, ReactToggleGrpItemProps>(
  function ToggleGrpItem(
    { size, variant, pressed, disabled, value, className, children, ...rest },
    ref,
  ) {
    const classes = toggleGrpItemClasses({ size, variant, pressed, disabled })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <button
        ref={ref}
        type="button"
        className={combinedClassName}
        disabled={disabled}
        aria-disabled={disabled || undefined}
        aria-pressed={pressed ?? false}
        data-value={value}
        {...rest}
      >
        {children}
      </button>
    )
  },
)
