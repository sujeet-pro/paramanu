import { forwardRef } from "react"
import { affixClasses } from "@paramanu/utilities-js"
import type { AffixClassesOptions } from "@paramanu/utilities-js"

export interface ReactAffixProps
  extends AffixClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Affix = forwardRef<HTMLDivElement, ReactAffixProps>(function Affix(
  { position, offset, className, children, ...rest },
  ref,
) {
  const classes = affixClasses({ position, offset })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
