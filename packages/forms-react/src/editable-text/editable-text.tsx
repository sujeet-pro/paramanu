import { forwardRef } from "react"
import { editableTextClasses } from "@paramanu/forms-js"
import type { EditableTextProps } from "@paramanu/forms-js"

export interface ReactEditableTextProps
  extends EditableTextProps,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const EditableText = forwardRef<HTMLDivElement, ReactEditableTextProps>(
  function EditableText({ size, disabled, editing, className, children, ...rest }, ref) {
    const classes = editableTextClasses({ size, disabled, editing })
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
  },
)
