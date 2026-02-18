import { forwardRef } from "react"
import {
  treeViewClasses,
  treeViewBranchClasses,
  treeViewItemClasses,
  treeViewItemContentClasses,
  treeViewIndicatorClasses,
  treeViewGroupClasses,
} from "@paramanu/navigation-js"
import type {
  TreeViewClassesOptions,
  TreeViewBranchClassesOptions,
  TreeViewItemClassesOptions,
  TreeViewIndicatorClassesOptions,
} from "@paramanu/navigation-js"

export interface ReactTreeViewProps
  extends TreeViewClassesOptions,
    React.HTMLAttributes<HTMLUListElement> {
  children?: React.ReactNode
}

export const TreeView = forwardRef<HTMLUListElement, ReactTreeViewProps>(function TreeView(
  { size, className, children, ...rest },
  ref,
) {
  const classes = treeViewClasses({ size })
  const combinedClassName = className ? `${classes} ${className}` : classes
  return (
    <ul ref={ref} role="tree" className={combinedClassName} {...rest}>
      {children}
    </ul>
  )
})

export interface ReactTreeViewBranchProps
  extends TreeViewBranchClassesOptions,
    React.LiHTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode
}

export const TreeViewBranch = forwardRef<HTMLLIElement, ReactTreeViewBranchProps>(
  function TreeViewBranch({ expanded, className, children, ...rest }, ref) {
    const classes = treeViewBranchClasses({ expanded })
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <li
        ref={ref}
        role="treeitem"
        aria-expanded={expanded}
        className={combinedClassName}
        {...rest}
      >
        {children}
      </li>
    )
  },
)

export interface ReactTreeViewItemProps
  extends TreeViewItemClassesOptions,
    React.LiHTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode
}

export const TreeViewItem = forwardRef<HTMLLIElement, ReactTreeViewItemProps>(
  function TreeViewItem({ selected, disabled, className, children, ...rest }, ref) {
    const classes = treeViewItemClasses({ selected, disabled })
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <li ref={ref} role="treeitem" className={combinedClassName} {...rest}>
        {children}
      </li>
    )
  },
)

export interface ReactTreeViewItemContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const TreeViewItemContent = forwardRef<HTMLDivElement, ReactTreeViewItemContentProps>(
  function TreeViewItemContent({ className, children, ...rest }, ref) {
    const classes = treeViewItemContentClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactTreeViewIndicatorProps
  extends TreeViewIndicatorClassesOptions,
    React.HTMLAttributes<HTMLSpanElement> {}

export const TreeViewIndicator = forwardRef<HTMLSpanElement, ReactTreeViewIndicatorProps>(
  function TreeViewIndicator({ expanded, className, ...rest }, ref) {
    const classes = treeViewIndicatorClasses({ expanded })
    const combinedClassName = className ? `${classes} ${className}` : classes
    return <span ref={ref} aria-hidden="true" className={combinedClassName} {...rest} />
  },
)

export interface ReactTreeViewGroupProps extends React.HTMLAttributes<HTMLUListElement> {
  children?: React.ReactNode
}

export const TreeViewGroup = forwardRef<HTMLUListElement, ReactTreeViewGroupProps>(
  function TreeViewGroup({ className, children, ...rest }, ref) {
    const classes = treeViewGroupClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <ul ref={ref} role="group" className={combinedClassName} {...rest}>
        {children}
      </ul>
    )
  },
)
