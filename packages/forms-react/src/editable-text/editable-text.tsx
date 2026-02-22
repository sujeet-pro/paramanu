import { forwardRef } from "react"
import { editableClasses } from "@paramanu/forms-js"
import type { EditableProps } from "@paramanu/forms-js"

export interface ReactEditableProps extends EditableProps, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Editable = forwardRef<HTMLDivElement, ReactEditableProps>(function Editable(
  { size, disabled, editing, className, children, ...rest },
  ref,
) {
  const classes = editableClasses({ size, disabled, editing })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div
      ref={ref}
      role="group"
      className={combinedClassName}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {children}
    </div>
  )
})
