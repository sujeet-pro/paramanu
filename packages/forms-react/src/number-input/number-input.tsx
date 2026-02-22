import { forwardRef, useCallback } from "react"
import { numInputClasses, inputClasses } from "@paramanu/forms-js"
import type { NumInputProps } from "@paramanu/forms-js"

export interface ReactNumInputProps
  extends
    NumInputProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "min" | "max" | "step"> {
  children?: React.ReactNode
}

export const NumInput = forwardRef<HTMLInputElement, ReactNumInputProps>(function NumInput(
  { variant, size, disabled, invalid, min, max, step = 1, className, onChange, ...rest },
  ref,
) {
  const wrapperClasses = numInputClasses({ variant, size, invalid, disabled })
  const innerClasses = inputClasses({ variant, size, invalid, disabled })
  const combinedWrapperClassName = className ? `${wrapperClasses} ${className}` : wrapperClasses

  const handleStep = useCallback(
    (direction: 1 | -1) => {
      if (disabled) return
      const input = (ref as React.RefObject<HTMLInputElement>)?.current
      if (!input) return
      const current = parseFloat(input.value) || 0
      const next = current + direction * (step ?? 1)
      if (min !== undefined && next < min) return
      if (max !== undefined && next > max) return
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value",
      )?.set
      nativeInputValueSetter?.call(input, String(next))
      input.dispatchEvent(new Event("input", { bubbles: true }))
    },
    [disabled, ref, step, min, max],
  )

  return (
    <div className={combinedWrapperClassName}>
      <input
        ref={ref}
        type="number"
        inputMode="numeric"
        className={innerClasses}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        aria-disabled={disabled || undefined}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        {...rest}
      />
      <div className="pm-num-input__stepper">
        <button
          type="button"
          className="pm-num-input__increment"
          aria-label="Increment"
          onClick={() => handleStep(1)}
          disabled={disabled}
          tabIndex={-1}
        >
          &#9650;
        </button>
        <button
          type="button"
          className="pm-num-input__decrement"
          aria-label="Decrement"
          onClick={() => handleStep(-1)}
          disabled={disabled}
          tabIndex={-1}
        >
          &#9660;
        </button>
      </div>
    </div>
  )
})
