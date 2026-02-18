import { forwardRef } from "react"
import {
  dataTableClasses,
  dataTableHeaderCellClasses,
} from "@paramanu/data-display-js"
import type {
  DataTableClassesOptions,
  DataTableHeaderCellClassesOptions,
} from "@paramanu/data-display-js"

export interface ReactDataTableProps
  extends DataTableClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const DataTable = forwardRef<HTMLDivElement, ReactDataTableProps>(function DataTable(
  { variant, size, hoverable, bordered, stickyHeader, selectable, className, children, ...rest },
  ref,
) {
  const classes = dataTableClasses({
    variant, size, hoverable, bordered, stickyHeader, selectable,
  })
  const combinedClassName = className ? `${classes.root} ${className}` : classes.root

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export interface ReactDataTableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const DataTableToolbar = forwardRef<HTMLDivElement, ReactDataTableToolbarProps>(
  function DataTableToolbar({ className, children, ...rest }, ref) {
    const classes = dataTableClasses()
    const combinedClassName = className ? `${classes.toolbar} ${className}` : classes.toolbar

    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactDataTableHeaderCellProps
  extends DataTableHeaderCellClassesOptions,
    Omit<React.ThHTMLAttributes<HTMLTableCellElement>, "align"> {
  children?: React.ReactNode
}

export const DataTableHeaderCell = forwardRef<HTMLTableCellElement, ReactDataTableHeaderCellProps>(
  function DataTableHeaderCell(
    { sortable, sortDirection, align, className, children, ...rest },
    ref,
  ) {
    const classes = dataTableHeaderCellClasses({ sortable, sortDirection, align })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <th
        ref={ref}
        className={combinedClassName}
        aria-sort={
          sortDirection === "asc"
            ? "ascending"
            : sortDirection === "desc"
              ? "descending"
              : undefined
        }
        {...rest}
      >
        {children}
      </th>
    )
  },
)

export interface ReactDataTableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children?: React.ReactNode
}

export const DataTableRow = forwardRef<HTMLTableRowElement, ReactDataTableRowProps>(
  function DataTableRow({ className, children, ...rest }, ref) {
    const classes = dataTableClasses()
    const combinedClassName = className ? `${classes.row} ${className}` : classes.row

    return (
      <tr ref={ref} className={combinedClassName} {...rest}>
        {children}
      </tr>
    )
  },
)

export interface ReactDataTableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children?: React.ReactNode
}

export const DataTableCell = forwardRef<HTMLTableCellElement, ReactDataTableCellProps>(
  function DataTableCell({ className, children, ...rest }, ref) {
    const classes = dataTableClasses()
    const combinedClassName = className ? `${classes.cell} ${className}` : classes.cell

    return (
      <td ref={ref} className={combinedClassName} {...rest}>
        {children}
      </td>
    )
  },
)

export interface ReactDataTablePaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const DataTablePagination = forwardRef<HTMLDivElement, ReactDataTablePaginationProps>(
  function DataTablePagination({ className, children, ...rest }, ref) {
    const classes = dataTableClasses()
    const combinedClassName = className
      ? `${classes.pagination} ${className}`
      : classes.pagination

    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)
