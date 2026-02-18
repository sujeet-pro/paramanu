import { forwardRef } from "react"
import { timelineClasses, timelineDotClasses } from "@paramanu/data-display-js"
import type { TimelineProps, TimelineDotProps } from "@paramanu/data-display-js"

export interface ReactTimelineProps
  extends TimelineProps,
    React.OlHTMLAttributes<HTMLOListElement> {
  children?: React.ReactNode
}

export const Timeline = forwardRef<HTMLOListElement, ReactTimelineProps>(function Timeline(
  { orientation, align, className, children, ...rest },
  ref,
) {
  const classes = timelineClasses({ orientation, align })
  const combinedClassName = className ? `${classes.root} ${className}` : classes.root

  return (
    <ol ref={ref} className={combinedClassName} {...rest}>
      {children}
    </ol>
  )
})

export interface ReactTimelineItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode
}

export const TimelineItem = forwardRef<HTMLLIElement, ReactTimelineItemProps>(
  function TimelineItem({ className, children, ...rest }, ref) {
    const classes = timelineClasses()
    const combinedClassName = className ? `${classes.item} ${className}` : classes.item

    return (
      <li ref={ref} className={combinedClassName} {...rest}>
        {children}
      </li>
    )
  },
)

export interface ReactTimelineConnectorProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const TimelineConnector = forwardRef<HTMLDivElement, ReactTimelineConnectorProps>(
  function TimelineConnector({ className, children, ...rest }, ref) {
    const classes = timelineClasses()
    const combinedClassName = className ? `${classes.connector} ${className}` : classes.connector

    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactTimelineDotProps
  extends TimelineDotProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  children?: React.ReactNode
}

export const TimelineDot = forwardRef<HTMLDivElement, ReactTimelineDotProps>(
  function TimelineDot({ variant, color, className, children, ...rest }, ref) {
    const classes = timelineDotClasses({ variant, color })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactTimelineContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const TimelineContent = forwardRef<HTMLDivElement, ReactTimelineContentProps>(
  function TimelineContent({ className, children, ...rest }, ref) {
    const classes = timelineClasses()
    const combinedClassName = className ? `${classes.content} ${className}` : classes.content

    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactTimelineOppositeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const TimelineOpposite = forwardRef<HTMLDivElement, ReactTimelineOppositeProps>(
  function TimelineOpposite({ className, children, ...rest }, ref) {
    const classes = timelineClasses()
    const combinedClassName = className ? `${classes.opposite} ${className}` : classes.opposite

    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)
