import { forwardRef } from "react"
import { switchClasses } from "@paramanu/forms-js"
import type { SwitchProps } from "@paramanu/forms-js"

export interface ReactSwitchProps
  extends SwitchProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  children?: React.ReactNode
}

export const Switch = forwardRef<HTMLInputElement, ReactSwitchProps>(function Switch(
  { size, disabled, checked, labelPlacement, className, children, ...rest },
  ref,
) {
  const classes = switchClasses({ size, disabled, checked, labelPlacement })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <label className={combinedClassName}>
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        className="pm-switch__input"
        checked={checked}
        disabled={disabled}
        aria-checked={checked ?? false}
        {...rest}
      />
      <span className="pm-switch__track">
        <span className="pm-switch__thumb" />
      </span>
      {children && <span className="pm-switch__label">{children}</span>}
    </label>
  )
})
