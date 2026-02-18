import { forwardRef } from "react"
import { structuredListClasses } from "@paramanu/data-display-js"
import type { StructuredListProps } from "@paramanu/data-display-js"

export interface ReactStructuredListProps
  extends StructuredListProps,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const StructuredList = forwardRef<HTMLDivElement, ReactStructuredListProps>(
  function StructuredList({ size, selectable, bordered, className, children, ...rest }, ref) {
    const classes = structuredListClasses({ size, selectable, bordered })
    const combinedClassName = className ? `${classes.root} ${className}` : classes.root

    return (
      <div ref={ref} role="table" className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactStructuredListHeadProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const StructuredListHead = forwardRef<HTMLDivElement, ReactStructuredListHeadProps>(
  function StructuredListHead({ className, children, ...rest }, ref) {
    const classes = structuredListClasses()
    const combinedClassName = className ? `${classes.head} ${className}` : classes.head

    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactStructuredListBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const StructuredListBody = forwardRef<HTMLDivElement, ReactStructuredListBodyProps>(
  function StructuredListBody({ className, children, ...rest }, ref) {
    const classes = structuredListClasses()
    const combinedClassName = className ? `${classes.body} ${className}` : classes.body

    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactStructuredListRowProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const StructuredListRow = forwardRef<HTMLDivElement, ReactStructuredListRowProps>(
  function StructuredListRow({ className, children, ...rest }, ref) {
    const classes = structuredListClasses()
    const combinedClassName = className ? `${classes.row} ${className}` : classes.row

    return (
      <div ref={ref} role="row" className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactStructuredListCellProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const StructuredListCell = forwardRef<HTMLDivElement, ReactStructuredListCellProps>(
  function StructuredListCell({ className, children, ...rest }, ref) {
    const classes = structuredListClasses()
    const combinedClassName = className ? `${classes.cell} ${className}` : classes.cell

    return (
      <div ref={ref} role="cell" className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactStructuredListHeaderCellProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const StructuredListHeaderCell = forwardRef<
  HTMLDivElement,
  ReactStructuredListHeaderCellProps
>(function StructuredListHeaderCell({ className, children, ...rest }, ref) {
  const classes = structuredListClasses()
  const combinedClassName = className ? `${classes.headerCell} ${className}` : classes.headerCell

  return (
    <div ref={ref} role="columnheader" className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
