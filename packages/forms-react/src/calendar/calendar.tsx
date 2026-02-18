import { forwardRef } from "react"
import { calendarClasses } from "@paramanu/forms-js"
import type { CalendarProps } from "@paramanu/forms-js"

export interface ReactCalendarProps extends CalendarProps, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Calendar = forwardRef<HTMLDivElement, ReactCalendarProps>(function Calendar(
  { size, className, children, ...rest },
  ref,
) {
  const classes = calendarClasses({ size })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} role="grid" {...rest}>
      {children}
    </div>
  )
})
