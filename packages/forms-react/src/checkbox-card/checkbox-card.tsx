import { forwardRef } from "react"
import { chkCardClasses } from "@paramanu/forms-js"
import type { ChkCardProps } from "@paramanu/forms-js"

export interface ReactChkCardProps
  extends ChkCardProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  children?: React.ReactNode
}

export const ChkCard = forwardRef<HTMLInputElement, ReactChkCardProps>(
  function ChkCard({ size, disabled, checked, className, children, ...rest }, ref) {
    const classes = chkCardClasses({ size, disabled, checked })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <label className={combinedClassName}>
        <input
          ref={ref}
          type="checkbox"
          className="pm-chk-card__input"
          checked={checked}
          disabled={disabled}
          {...rest}
        />
        <div className="pm-chk-card__content">{children}</div>
      </label>
    )
  },
)
