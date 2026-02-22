import { forwardRef } from "react"
import { radioCardClasses } from "@paramanu/forms-js"
import type { RadioCardProps } from "@paramanu/forms-js"

export interface ReactRadioCardProps
  extends
    RadioCardProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "value"> {
  children?: React.ReactNode
}

export const RadioCard = forwardRef<HTMLInputElement, ReactRadioCardProps>(function RadioCard(
  { size, disabled, checked, name, value, className, children, ...rest },
  ref,
) {
  const classes = radioCardClasses({ size, disabled, checked })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <label className={combinedClassName}>
      <input
        ref={ref}
        type="radio"
        className="pm-radio-card__input"
        checked={checked}
        disabled={disabled}
        name={name}
        value={value}
        {...rest}
      />
      <div className="pm-radio-card__content">{children}</div>
    </label>
  )
})
