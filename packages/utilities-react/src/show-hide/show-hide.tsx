import { forwardRef } from "react"
import { showHideClasses } from "@paramanu/utilities-js"
import type { ShowHideClassesOptions } from "@paramanu/utilities-js"

export interface ReactShowHideProps
  extends ShowHideClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const ShowHide = forwardRef<HTMLDivElement, ReactShowHideProps>(function ShowHide(
  { display, className, children, ...rest },
  ref,
) {
  const classes = showHideClasses({ display })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
