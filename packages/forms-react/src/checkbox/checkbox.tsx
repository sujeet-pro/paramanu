import { forwardRef, useEffect, useRef } from "react"
import { checkboxClasses } from "@paramanu/forms-js"
import type { CheckboxProps } from "@paramanu/forms-js"

export interface ReactCheckboxProps
  extends CheckboxProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  children?: React.ReactNode
}

export const Checkbox = forwardRef<HTMLInputElement, ReactCheckboxProps>(function Checkbox(
  { size, disabled, invalid, checked, indeterminate, className, children, ...rest },
  ref,
) {
  const internalRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const input =
      typeof ref === "function" ? internalRef.current : (ref?.current ?? internalRef.current)
    if (input) {
      input.indeterminate = indeterminate ?? false
    }
  }, [indeterminate, ref])

  const classes = checkboxClasses({ size, disabled, invalid, checked, indeterminate })
  const combinedClassName = className ? `${classes} ${className}` : classes

  const setRefs = (el: HTMLInputElement | null) => {
    ;(internalRef as React.MutableRefObject<HTMLInputElement | null>).current = el
    if (typeof ref === "function") {
      ref(el)
    } else if (ref) {
      ;(ref as React.MutableRefObject<HTMLInputElement | null>).current = el
    }
  }

  return (
    <label className={combinedClassName}>
      <input
        ref={setRefs}
        type="checkbox"
        className="pm-checkbox__input"
        checked={checked}
        disabled={disabled}
        aria-checked={indeterminate ? "mixed" : checked ? "true" : undefined}
        aria-invalid={invalid || undefined}
        {...rest}
      />
      <span className="pm-checkbox__indicator">&#10003;</span>
      {children && <span className="pm-checkbox__label">{children}</span>}
    </label>
  )
})
