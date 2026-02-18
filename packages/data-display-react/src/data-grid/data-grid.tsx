import { forwardRef } from "react"
import { dataGridClasses } from "@paramanu/data-display-js"
import type { DataGridClassesOptions } from "@paramanu/data-display-js"

export interface ReactDataGridProps
  extends DataGridClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const DataGrid = forwardRef<HTMLDivElement, ReactDataGridProps>(function DataGrid(
  { size, bordered, hoverable, stickyHeader, resizable, className, children, ...rest },
  ref,
) {
  const classes = dataGridClasses({ size, bordered, hoverable, stickyHeader, resizable })
  const combinedClassName = className ? `${classes.root} ${className}` : classes.root

  return (
    <div ref={ref} role="grid" className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export interface ReactDataGridRowProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const DataGridRow = forwardRef<HTMLDivElement, ReactDataGridRowProps>(
  function DataGridRow({ className, children, ...rest }, ref) {
    const classes = dataGridClasses()
    const combinedClassName = className ? `${classes.row} ${className}` : classes.row

    return (
      <div ref={ref} role="row" className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactDataGridCellProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const DataGridCell = forwardRef<HTMLDivElement, ReactDataGridCellProps>(
  function DataGridCell({ className, children, ...rest }, ref) {
    const classes = dataGridClasses()
    const combinedClassName = className ? `${classes.cell} ${className}` : classes.cell

    return (
      <div ref={ref} role="gridcell" className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactDataGridColumnHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const DataGridColumnHeader = forwardRef<HTMLDivElement, ReactDataGridColumnHeaderProps>(
  function DataGridColumnHeader({ className, children, ...rest }, ref) {
    const classes = dataGridClasses()
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
