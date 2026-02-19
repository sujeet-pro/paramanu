import { forwardRef } from "react"
import { datalistClasses } from "@paramanu/data-display-js"
import type { DatalistProps } from "@paramanu/data-display-js"

export interface ReactDatalistProps
  extends DatalistProps,
    React.HTMLAttributes<HTMLDListElement> {
  children?: React.ReactNode
}

export const Datalist = forwardRef<HTMLDListElement, ReactDatalistProps>(function Datalist(
  { orientation, size, dividers, className, children, ...rest },
  ref,
) {
  const classes = datalistClasses({ orientation, size, dividers })
  const combinedClassName = className ? `${classes.root} ${className}` : classes.root

  return (
    <dl ref={ref} className={combinedClassName} {...rest}>
      {children}
    </dl>
  )
})

export interface ReactDatalistItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const DatalistItem = forwardRef<HTMLDivElement, ReactDatalistItemProps>(
  function DatalistItem({ className, children, ...rest }, ref) {
    const classes = datalistClasses()
    const combinedClassName = className ? `${classes.item} ${className}` : classes.item

    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactDatalistTermProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
}

export const DatalistTerm = forwardRef<HTMLElement, ReactDatalistTermProps>(
  function DatalistTerm({ className, children, ...rest }, ref) {
    const classes = datalistClasses()
    const combinedClassName = className ? `${classes.term} ${className}` : classes.term

    return (
      <dt ref={ref} className={combinedClassName} {...rest}>
        {children}
      </dt>
    )
  },
)

export interface ReactDatalistDetailProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
}

export const DatalistDetail = forwardRef<HTMLElement, ReactDatalistDetailProps>(
  function DatalistDetail({ className, children, ...rest }, ref) {
    const classes = datalistClasses()
    const combinedClassName = className ? `${classes.detail} ${className}` : classes.detail

    return (
      <dd ref={ref} className={combinedClassName} {...rest}>
        {children}
      </dd>
    )
  },
)
