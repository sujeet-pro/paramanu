import { forwardRef } from "react"
import { loadingClasses } from "@paramanu/feedback-js"
import type { LoadingClassesOptions } from "@paramanu/feedback-js"

export interface ReactLoadingProps
  extends LoadingClassesOptions, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Loading = forwardRef<HTMLDivElement, ReactLoadingProps>(function Loading(
  { visible, blur, className, children, ...rest },
  ref,
) {
  const classes = loadingClasses({ visible, blur })
  const combinedClassName = className ? `${classes.root} ${className}` : classes.root

  return (
    <div ref={ref} className={combinedClassName} aria-hidden={!visible} {...rest}>
      <div className={classes.backdrop} />
      <div className={classes.content}>{children}</div>
    </div>
  )
})
