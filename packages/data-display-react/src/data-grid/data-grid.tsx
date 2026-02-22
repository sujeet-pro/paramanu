import { forwardRef } from "react"
import { datagridClasses } from "@paramanu/data-display-js"
import type { DatagridClassesOptions } from "@paramanu/data-display-js"

export interface ReactDatagridProps
  extends DatagridClassesOptions, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Datagrid = forwardRef<HTMLDivElement, ReactDatagridProps>(function Datagrid(
  { size, bordered, hoverable, stickyHeader, resizable, className, children, ...rest },
  ref,
) {
  const classes = datagridClasses({ size, bordered, hoverable, stickyHeader, resizable })
  const combinedClassName = className ? `${classes.root} ${className}` : classes.root

  return (
    <div ref={ref} role="grid" className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export interface ReactDatagridRowProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const DatagridRow = forwardRef<HTMLDivElement, ReactDatagridRowProps>(function DatagridRow(
  { className, children, ...rest },
  ref,
) {
  const classes = datagridClasses()
  const combinedClassName = className ? `${classes.row} ${className}` : classes.row

  return (
    <div ref={ref} role="row" className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export interface ReactDatagridCellProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const DatagridCell = forwardRef<HTMLDivElement, ReactDatagridCellProps>(
  function DatagridCell({ className, children, ...rest }, ref) {
    const classes = datagridClasses()
    const combinedClassName = className ? `${classes.cell} ${className}` : classes.cell

    return (
      <div ref={ref} role="gridcell" className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactDatagridColumnHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const DatagridColumnHeader = forwardRef<HTMLDivElement, ReactDatagridColumnHeaderProps>(
  function DatagridColumnHeader({ className, children, ...rest }, ref) {
    const classes = datagridClasses()
    const combinedClassName = className
      ? `${classes.columnHeader} ${className}`
      : classes.columnHeader

    return (
      <div ref={ref} role="columnheader" className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)
