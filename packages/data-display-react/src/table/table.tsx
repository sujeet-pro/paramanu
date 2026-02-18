import { forwardRef } from "react"
import { tableClasses } from "@paramanu/data-display-js"
import type { TableProps } from "@paramanu/data-display-js"

export interface ReactTableProps
  extends TableProps,
    React.TableHTMLAttributes<HTMLTableElement> {
  children?: React.ReactNode
}

export const Table = forwardRef<HTMLTableElement, ReactTableProps>(function Table(
  { variant, size, layout, hoverable, bordered, stickyHeader, className, children, ...rest },
  ref,
) {
  const classes = tableClasses({ variant, size, layout, hoverable, bordered, stickyHeader })
  const combinedClassName = className ? `${classes.root} ${className}` : classes.root

  return (
    <table ref={ref} className={combinedClassName} {...rest}>
      {children}
    </table>
  )
})

export interface ReactTableContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const TableContainer = forwardRef<HTMLDivElement, ReactTableContainerProps>(
  function TableContainer({ className, children, ...rest }, ref) {
    const classes = tableClasses()
    const combinedClassName = className ? `${classes.container} ${className}` : classes.container

    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactTableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
  children?: React.ReactNode
}

export const TableCaption = forwardRef<HTMLTableCaptionElement, ReactTableCaptionProps>(
  function TableCaption({ className, children, ...rest }, ref) {
    const classes = tableClasses()
    const combinedClassName = className ? `${classes.caption} ${className}` : classes.caption

    return (
      <caption ref={ref} className={combinedClassName} {...rest}>
        {children}
      </caption>
    )
  },
)

export interface ReactTableHeadProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  children?: React.ReactNode
}

export const TableHead = forwardRef<HTMLTableSectionElement, ReactTableHeadProps>(
  function TableHead({ className, children, ...rest }, ref) {
    const classes = tableClasses()
    const combinedClassName = className ? `${classes.head} ${className}` : classes.head

    return (
      <thead ref={ref} className={combinedClassName} {...rest}>
        {children}
      </thead>
    )
  },
)

export interface ReactTableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  children?: React.ReactNode
}

export const TableBody = forwardRef<HTMLTableSectionElement, ReactTableBodyProps>(
  function TableBody({ className, children, ...rest }, ref) {
    const classes = tableClasses()
    const combinedClassName = className ? `${classes.body} ${className}` : classes.body

    return (
      <tbody ref={ref} className={combinedClassName} {...rest}>
        {children}
      </tbody>
    )
  },
)

export interface ReactTableFootProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  children?: React.ReactNode
}

export const TableFoot = forwardRef<HTMLTableSectionElement, ReactTableFootProps>(
  function TableFoot({ className, children, ...rest }, ref) {
    const classes = tableClasses()
    const combinedClassName = className ? `${classes.foot} ${className}` : classes.foot

    return (
      <tfoot ref={ref} className={combinedClassName} {...rest}>
        {children}
      </tfoot>
    )
  },
)

export interface ReactTableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children?: React.ReactNode
}

export const TableRow = forwardRef<HTMLTableRowElement, ReactTableRowProps>(
  function TableRow({ className, children, ...rest }, ref) {
    const classes = tableClasses()
    const combinedClassName = className ? `${classes.row} ${className}` : classes.row

    return (
      <tr ref={ref} className={combinedClassName} {...rest}>
        {children}
      </tr>
    )
  },
)

export interface ReactTableHeaderCellProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children?: React.ReactNode
}

export const TableHeaderCell = forwardRef<HTMLTableCellElement, ReactTableHeaderCellProps>(
  function TableHeaderCell({ className, children, ...rest }, ref) {
    const classes = tableClasses()
    const combinedClassName = className
      ? `${classes.headerCell} ${className}`
      : classes.headerCell

    return (
      <th ref={ref} className={combinedClassName} {...rest}>
        {children}
      </th>
    )
  },
)

export interface ReactTableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children?: React.ReactNode
}

export const TableCell = forwardRef<HTMLTableCellElement, ReactTableCellProps>(
  function TableCell({ className, children, ...rest }, ref) {
    const classes = tableClasses()
    const combinedClassName = className ? `${classes.cell} ${className}` : classes.cell

    return (
      <td ref={ref} className={combinedClassName} {...rest}>
        {children}
      </td>
    )
  },
)
