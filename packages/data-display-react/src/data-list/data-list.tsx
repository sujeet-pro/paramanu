import { forwardRef } from "react"
import { dataListClasses } from "@paramanu/data-display-js"
import type { DataListProps } from "@paramanu/data-display-js"

export interface ReactDataListProps
  extends DataListProps,
    React.HTMLAttributes<HTMLDListElement> {
  children?: React.ReactNode
}

export const DataList = forwardRef<HTMLDListElement, ReactDataListProps>(function DataList(
  { orientation, size, dividers, className, children, ...rest },
  ref,
) {
  const classes = dataListClasses({ orientation, size, dividers })
  const combinedClassName = className ? `${classes.root} ${className}` : classes.root

  return (
    <dl ref={ref} className={combinedClassName} {...rest}>
      {children}
    </dl>
  )
})

export interface ReactDataListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const DataListItem = forwardRef<HTMLDivElement, ReactDataListItemProps>(
  function DataListItem({ className, children, ...rest }, ref) {
    const classes = dataListClasses()
    const combinedClassName = className ? `${classes.item} ${className}` : classes.item

    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactDataListTermProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
}

export const DataListTerm = forwardRef<HTMLElement, ReactDataListTermProps>(
  function DataListTerm({ className, children, ...rest }, ref) {
    const classes = dataListClasses()
    const combinedClassName = className ? `${classes.term} ${className}` : classes.term

    return (
      <dt ref={ref} className={combinedClassName} {...rest}>
        {children}
      </dt>
    )
  },
)

export interface ReactDataListDetailProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
}

export const DataListDetail = forwardRef<HTMLElement, ReactDataListDetailProps>(
  function DataListDetail({ className, children, ...rest }, ref) {
    const classes = dataListClasses()
    const combinedClassName = className ? `${classes.detail} ${className}` : classes.detail

    return (
      <dd ref={ref} className={combinedClassName} {...rest}>
        {children}
      </dd>
    )
  },
)
