import { forwardRef } from "react"
import { mentionsClasses } from "@paramanu/forms-js"
import type { MentionsProps } from "@paramanu/forms-js"

export interface ReactMentionsProps
  extends MentionsProps,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Mentions = forwardRef<HTMLDivElement, ReactMentionsProps>(function Mentions(
  { variant, size, invalid, disabled, className, children, ...rest },
  ref,
) {
  const classes = mentionsClasses({ variant, size, invalid, disabled })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div
      ref={ref}
      className={combinedClassName}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {children}
    </div>
  )
})
