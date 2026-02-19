import { forwardRef } from "react"
import { structListClasses } from "@paramanu/data-display-js"
import type { StructListProps } from "@paramanu/data-display-js"

export interface ReactStructListProps
  extends StructListProps,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const StructList = forwardRef<HTMLDivElement, ReactStructListProps>(
  function StructList({ size, selectable, bordered, className, children, ...rest }, ref) {
    const classes = structListClasses({ size, selectable, bordered })
    const combinedClassName = className ? `${classes.root} ${className}` : classes.root

    return (
      <div ref={ref} role="table" className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactStructListHeadProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const StructListHead = forwardRef<HTMLDivElement, ReactStructListHeadProps>(
  function StructListHead({ className, children, ...rest }, ref) {
    const classes = structListClasses()
    const combinedClassName = className ? `${classes.head} ${className}` : classes.head

    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactStructListBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const StructListBody = forwardRef<HTMLDivElement, ReactStructListBodyProps>(
  function StructListBody({ className, children, ...rest }, ref) {
    const classes = structListClasses()
    const combinedClassName = className ? `${classes.body} ${className}` : classes.body

    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactStructListRowProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const StructListRow = forwardRef<HTMLDivElement, ReactStructListRowProps>(
  function StructListRow({ className, children, ...rest }, ref) {
    const classes = structListClasses()
    const combinedClassName = className ? `${classes.row} ${className}` : classes.row

    return (
      <div ref={ref} role="row" className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactStructListCellProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const StructListCell = forwardRef<HTMLDivElement, ReactStructListCellProps>(
  function StructListCell({ className, children, ...rest }, ref) {
    const classes = structListClasses()
    const combinedClassName = className ? `${classes.cell} ${className}` : classes.cell

    return (
      <div ref={ref} role="cell" className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactStructListHeaderCellProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const StructListHeaderCell = forwardRef<
  HTMLDivElement,
  ReactStructListHeaderCellProps
>(function StructListHeaderCell({ className, children, ...rest }, ref) {
  const classes = structListClasses()
  const combinedClassName = className ? `${classes.headerCell} ${className}` : classes.headerCell

  return (
    <div ref={ref} role="columnheader" className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
