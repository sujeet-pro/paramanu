import { forwardRef } from "react"
import { tagsInputClasses } from "@paramanu/forms-js"
import type { TagsInputProps } from "@paramanu/forms-js"

export interface ReactTagsInputProps
  extends TagsInputProps,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const TagsInput = forwardRef<HTMLDivElement, ReactTagsInputProps>(function TagsInput(
  { variant, size, disabled, invalid, className, children, ...rest },
  ref,
) {
  const classes = tagsInputClasses({ variant, size, disabled, invalid })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div
      ref={ref}
      role="group"
      className={combinedClassName}
      aria-disabled={disabled || undefined}
      aria-invalid={invalid || undefined}
      {...rest}
    >
      {children}
    </div>
  )
})
