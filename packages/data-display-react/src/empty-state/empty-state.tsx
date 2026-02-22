import { forwardRef } from "react"
import { emptyClasses } from "@paramanu/data-display-js"
import type { EmptyProps } from "@paramanu/data-display-js"

export interface ReactEmptyProps extends EmptyProps, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Empty = forwardRef<HTMLDivElement, ReactEmptyProps>(function Empty(
  { size, bordered, className, children, ...rest },
  ref,
) {
  const classes = emptyClasses({ size, bordered })
  const combinedClassName = className ? `${classes.root} ${className}` : classes.root

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export interface ReactEmptyIconProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const EmptyIcon = forwardRef<HTMLDivElement, ReactEmptyIconProps>(function EmptyIcon(
  { className, children, ...rest },
  ref,
) {
  const classes = emptyClasses()
  const combinedClassName = className ? `${classes.icon} ${className}` : classes.icon

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export interface ReactEmptyHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode
}

export const EmptyHeading = forwardRef<HTMLHeadingElement, ReactEmptyHeadingProps>(
  function EmptyHeading({ className, children, ...rest }, ref) {
    const classes = emptyClasses()
    const combinedClassName = className ? `${classes.heading} ${className}` : classes.heading

    return (
      <h3 ref={ref} className={combinedClassName} {...rest}>
        {children}
      </h3>
    )
  },
)

export interface ReactEmptyDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode
}

export const EmptyDescription = forwardRef<HTMLParagraphElement, ReactEmptyDescriptionProps>(
  function EmptyDescription({ className, children, ...rest }, ref) {
    const classes = emptyClasses()
    const combinedClassName = className
      ? `${classes.description} ${className}`
      : classes.description

    return (
      <p ref={ref} className={combinedClassName} {...rest}>
        {children}
      </p>
    )
  },
)

export interface ReactEmptyActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const EmptyActions = forwardRef<HTMLDivElement, ReactEmptyActionsProps>(
  function EmptyActions({ className, children, ...rest }, ref) {
    const classes = emptyClasses()
    const combinedClassName = className ? `${classes.actions} ${className}` : classes.actions

    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)
