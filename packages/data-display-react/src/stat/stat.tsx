import { forwardRef } from "react"
import { statClasses, statHelpTextClasses } from "@paramanu/data-display-js"
import type { StatClassesOptions, StatTrend } from "@paramanu/data-display-js"

export interface ReactStatProps extends StatClassesOptions, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Stat = forwardRef<HTMLDivElement, ReactStatProps>(function Stat(
  { size, align, className, children, ...rest },
  ref,
) {
  const classes = statClasses({ size, align })
  const combinedClassName = className ? `${classes.root} ${className}` : classes.root

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export interface ReactStatLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const StatLabel = forwardRef<HTMLDivElement, ReactStatLabelProps>(function StatLabel(
  { className, children, ...rest },
  ref,
) {
  const classes = statClasses()
  const combinedClassName = className ? `${classes.label} ${className}` : classes.label

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export interface ReactStatValueProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const StatValue = forwardRef<HTMLDivElement, ReactStatValueProps>(function StatValue(
  { className, children, ...rest },
  ref,
) {
  const classes = statClasses()
  const combinedClassName = className ? `${classes.value} ${className}` : classes.value

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export interface ReactStatHelpTextProps extends React.HTMLAttributes<HTMLDivElement> {
  trend?: StatTrend
  children?: React.ReactNode
}

export const StatHelpText = forwardRef<HTMLDivElement, ReactStatHelpTextProps>(
  function StatHelpText({ trend, className, children, ...rest }, ref) {
    const classes = statHelpTextClasses({ trend })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)
