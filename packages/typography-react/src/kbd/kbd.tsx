import { forwardRef } from "react"
import { kbdClasses } from "@paramanu/typography-js"
import type { KbdClassesOptions } from "@paramanu/typography-js"

export interface ReactKbdProps extends KbdClassesOptions, React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
}

export const Kbd = forwardRef<HTMLElement, ReactKbdProps>(function Kbd(
  { size, variant, className, children, ...rest },
  ref,
) {
  const classes = kbdClasses({ size, variant })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <kbd ref={ref as React.Ref<HTMLElement>} className={combinedClassName} {...rest}>
      {children}
    </kbd>
  )
})
