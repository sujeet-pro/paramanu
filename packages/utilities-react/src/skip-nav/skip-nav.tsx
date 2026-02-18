import { forwardRef } from "react"
import { skipNavClasses, skipNavTargetClasses } from "@paramanu/utilities-js"

export interface ReactSkipNavProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  targetId?: string
  children?: React.ReactNode
}

export const SkipNav = forwardRef<HTMLAnchorElement, ReactSkipNavProps>(function SkipNav(
  { targetId = "main-content", className, children, ...rest },
  ref,
) {
  const classes = skipNavClasses()
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <a ref={ref} href={`#${targetId}`} className={combinedClassName} {...rest}>
      {children ?? "Skip to content"}
    </a>
  )
})

export interface ReactSkipNavTargetProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string
  children?: React.ReactNode
}

export const SkipNavTarget = forwardRef<HTMLDivElement, ReactSkipNavTargetProps>(
  function SkipNavTarget({ id = "main-content", className, children, ...rest }, ref) {
    const classes = skipNavTargetClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div ref={ref} id={id} tabIndex={-1} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)
