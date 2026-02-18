import { forwardRef } from "react"
import { tagClasses } from "@paramanu/data-display-js"
import type { TagClassesOptions } from "@paramanu/data-display-js"

export interface ReactTagProps
  extends TagClassesOptions,
    Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  onRemove?: () => void
  children?: React.ReactNode
}

export const Tag = forwardRef<HTMLSpanElement, ReactTagProps>(function Tag(
  { variant, size, color, removable, interactive, disabled, onRemove, className, children, ...rest },
  ref,
) {
  const classes = tagClasses({ variant, size, color, removable, interactive, disabled })
  const combinedClassName = className ? `${classes.root} ${className}` : classes.root

  return (
    <span ref={ref} className={combinedClassName} {...rest}>
      {children}
      {removable && (
        <button
          type="button"
          className={classes.remove}
          onClick={onRemove}
          aria-label="Remove"
          disabled={disabled}
        />
      )}
    </span>
  )
})
