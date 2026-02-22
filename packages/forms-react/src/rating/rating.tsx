import { forwardRef } from "react"
import { ratingClasses } from "@paramanu/forms-js"
import type { RatingProps } from "@paramanu/forms-js"

export interface ReactRatingProps extends RatingProps, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Rating = forwardRef<HTMLDivElement, ReactRatingProps>(function Rating(
  { size, disabled, readOnly, count, className, children, ...rest },
  ref,
) {
  const classes = ratingClasses({ size, disabled, readOnly })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div
      ref={ref}
      role="radiogroup"
      className={combinedClassName}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {children}
    </div>
  )
})
