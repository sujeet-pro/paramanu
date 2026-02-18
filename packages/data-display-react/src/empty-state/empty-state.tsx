import { forwardRef } from "react"
import { emptyStateClasses } from "@paramanu/data-display-js"
import type { EmptyStateProps } from "@paramanu/data-display-js"

export interface ReactEmptyStateProps
  extends EmptyStateProps,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const EmptyState = forwardRef<HTMLDivElement, ReactEmptyStateProps>(function EmptyState(
  { size, bordered, className, children, ...rest },
  ref,
) {
  const classes = emptyStateClasses({ size, bordered })
  const combinedClassName = className ? `${classes.root} ${className}` : classes.root

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export interface ReactEmptyStateIconProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const EmptyStateIcon = forwardRef<HTMLDivElement, ReactEmptyStateIconProps>(
  function EmptyStateIcon({ className, children, ...rest }, ref) {
    const classes = emptyStateClasses()
    const combinedClassName = className ? `${classes.icon} ${className}` : classes.icon

    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactEmptyStateHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode
}

export const EmptyStateHeading = forwardRef<HTMLHeadingElement, ReactEmptyStateHeadingProps>(
  function EmptyStateHeading({ className, children, ...rest }, ref) {
    const classes = emptyStateClasses()
    const combinedClassName = className ? `${classes.heading} ${className}` : classes.heading

    return (
      <h3 ref={ref} className={combinedClassName} {...rest}>
        {children}
      </h3>
    )
  },
)

export interface ReactEmptyStateDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode
}

export const EmptyStateDescription = forwardRef<
  HTMLParagraphElement,
  ReactEmptyStateDescriptionProps
>(function EmptyStateDescription({ className, children, ...rest }, ref) {
  const classes = emptyStateClasses()
  const combinedClassName = className ? `${classes.description} ${className}` : classes.description

  return (
    <p ref={ref} className={combinedClassName} {...rest}>
      {children}
    </p>
  )
})

export interface ReactEmptyStateActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const EmptyStateActions = forwardRef<HTMLDivElement, ReactEmptyStateActionsProps>(
  function EmptyStateActions({ className, children, ...rest }, ref) {
    const classes = emptyStateClasses()
    const combinedClassName = className ? `${classes.actions} ${className}` : classes.actions

    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)
