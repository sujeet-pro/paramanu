import { forwardRef } from "react"
import { checkboxCardClasses } from "@paramanu/forms-js"
import type { CheckboxCardProps } from "@paramanu/forms-js"

export interface ReactCheckboxCardProps
  extends CheckboxCardProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  children?: React.ReactNode
}

export const CheckboxCard = forwardRef<HTMLInputElement, ReactCheckboxCardProps>(
  function CheckboxCard({ size, disabled, checked, className, children, ...rest }, ref) {
    const classes = checkboxCardClasses({ size, disabled, checked })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <label className={combinedClassName}>
        <input
          ref={ref}
          type="checkbox"
          className="pm-checkbox-card__input"
          checked={checked}
          disabled={disabled}
          {...rest}
        />
        <div className="pm-checkbox-card__content">{children}</div>
      </label>
    )
  },
)
