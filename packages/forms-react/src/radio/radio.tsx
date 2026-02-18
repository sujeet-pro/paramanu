import { forwardRef } from "react"
import { radioClasses, radioGroupClasses } from "@paramanu/forms-js"
import type { RadioProps, RadioGroupProps } from "@paramanu/forms-js"

export interface ReactRadioProps
  extends RadioProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "value"> {
  children?: React.ReactNode
}

export const Radio = forwardRef<HTMLInputElement, ReactRadioProps>(function Radio(
  { size, disabled, invalid, checked, name, value, className, children, ...rest },
  ref,
) {
  const classes = radioClasses({ size, disabled, invalid, checked })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <label className={combinedClassName}>
      <input
        ref={ref}
        type="radio"
        className="pm-radio__input"
        checked={checked}
        disabled={disabled}
        name={name}
        value={value}
        aria-invalid={invalid || undefined}
        {...rest}
      />
      <span className="pm-radio__indicator" />
      {children && <span className="pm-radio__label">{children}</span>}
    </label>
  )
})

export interface ReactRadioGroupProps
  extends RadioGroupProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
  children?: React.ReactNode
}

export const RadioGroup = forwardRef<HTMLDivElement, ReactRadioGroupProps>(function RadioGroup(
  { orientation, size, name, className, children, ...rest },
  ref,
) {
  const classes = radioGroupClasses({ orientation, size })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} role="radiogroup" className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
