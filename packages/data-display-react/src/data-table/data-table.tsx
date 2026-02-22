import { forwardRef } from "react"
import { datatableClasses, dataTableHeaderCellClasses } from "@paramanu/data-display-js"
import type {
  DatatableClassesOptions,
  DatatableHeaderCellClassesOptions,
} from "@paramanu/data-display-js"

export interface ReactDatatableProps
  extends DatatableClassesOptions, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Datatable = forwardRef<HTMLDivElement, ReactDatatableProps>(function Datatable(
  { variant, size, hoverable, bordered, stickyHeader, selectable, className, children, ...rest },
  ref,
) {
  const classes = datatableClasses({
    variant,
    size,
    hoverable,
    bordered,
    stickyHeader,
    selectable,
  })
  const combinedClassName = className ? `${classes.root} ${className}` : classes.root

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export interface ReactDatatableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const DatatableToolbar = forwardRef<HTMLDivElement, ReactDatatableToolbarProps>(
  function DatatableToolbar({ className, children, ...rest }, ref) {
    const classes = datatableClasses()
    const combinedClassName = className ? `${classes.toolbar} ${className}` : classes.toolbar

    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactDatatableHeaderCellProps
  extends
    DatatableHeaderCellClassesOptions,
    Omit<React.ThHTMLAttributes<HTMLTableCellElement>, "align"> {
  children?: React.ReactNode
}

export const DatatableHeaderCell = forwardRef<HTMLTableCellElement, ReactDatatableHeaderCellProps>(
  function DatatableHeaderCell(
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

export interface ReactDatatableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children?: React.ReactNode
}

export const DatatableRow = forwardRef<HTMLTableRowElement, ReactDatatableRowProps>(
  function DatatableRow({ className, children, ...rest }, ref) {
    const classes = datatableClasses()
    const combinedClassName = className ? `${classes.row} ${className}` : classes.row

    return (
      <tr ref={ref} className={combinedClassName} {...rest}>
        {children}
      </tr>
    )
  },
)

export interface ReactDatatableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children?: React.ReactNode
}

export const DatatableCell = forwardRef<HTMLTableCellElement, ReactDatatableCellProps>(
  function DatatableCell({ className, children, ...rest }, ref) {
    const classes = datatableClasses()
    const combinedClassName = className ? `${classes.cell} ${className}` : classes.cell

    return (
      <td ref={ref} className={combinedClassName} {...rest}>
        {children}
      </td>
    )
  },
)

export interface ReactDatatablePaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const DatatablePagination = forwardRef<HTMLDivElement, ReactDatatablePaginationProps>(
  function DatatablePagination({ className, children, ...rest }, ref) {
    const classes = datatableClasses()
    const combinedClassName = className ? `${classes.pagination} ${className}` : classes.pagination

    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)
