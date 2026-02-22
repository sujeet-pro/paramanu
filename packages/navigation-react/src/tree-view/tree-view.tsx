import { forwardRef } from "react"
import {
  treeClasses,
  treeViewBranchClasses,
  treeItemClasses,
  treeViewItemContentClasses,
  treeViewIndicatorClasses,
  treeViewGroupClasses,
} from "@paramanu/navigation-js"
import type {
  TreeClassesOptions,
  TreeBranchClassesOptions,
  TreeItemClassesOptions,
  TreeIndicatorClassesOptions,
} from "@paramanu/navigation-js"

export interface ReactTreeProps extends TreeClassesOptions, React.HTMLAttributes<HTMLUListElement> {
  children?: React.ReactNode
}

export const Tree = forwardRef<HTMLUListElement, ReactTreeProps>(function Tree(
  { size, className, children, ...rest },
  ref,
) {
  const classes = treeClasses({ size })
  const combinedClassName = className ? `${classes} ${className}` : classes
  return (
    <ul ref={ref} role="tree" className={combinedClassName} {...rest}>
      {children}
    </ul>
  )
})

export interface ReactTreeBranchProps
  extends TreeBranchClassesOptions, React.LiHTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode
}

export const TreeBranch = forwardRef<HTMLLIElement, ReactTreeBranchProps>(function TreeBranch(
  { expanded, className, children, ...rest },
  ref,
) {
  const classes = treeViewBranchClasses({ expanded })
  const combinedClassName = className ? `${classes} ${className}` : classes
  return (
    <li ref={ref} role="treeitem" aria-expanded={expanded} className={combinedClassName} {...rest}>
      {children}
    </li>
  )
})

export interface ReactTreeItemProps
  extends TreeItemClassesOptions, React.LiHTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode
}

export const TreeItem = forwardRef<HTMLLIElement, ReactTreeItemProps>(function TreeItem(
  { selected, disabled, className, children, ...rest },
  ref,
) {
  const classes = treeItemClasses({ selected, disabled })
  const combinedClassName = className ? `${classes} ${className}` : classes
  return (
    <li ref={ref} role="treeitem" className={combinedClassName} {...rest}>
      {children}
    </li>
  )
})

export interface ReactTreeItemContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const TreeItemContent = forwardRef<HTMLDivElement, ReactTreeItemContentProps>(
  function TreeItemContent({ className, children, ...rest }, ref) {
    const classes = treeViewItemContentClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactTreeIndicatorProps
  extends TreeIndicatorClassesOptions, React.HTMLAttributes<HTMLSpanElement> {}

export const TreeIndicator = forwardRef<HTMLSpanElement, ReactTreeIndicatorProps>(
  function TreeIndicator({ expanded, className, ...rest }, ref) {
    const classes = treeViewIndicatorClasses({ expanded })
    const combinedClassName = className ? `${classes} ${className}` : classes
    return <span ref={ref} aria-hidden="true" className={combinedClassName} {...rest} />
  },
)

export interface ReactTreeGroupProps extends React.HTMLAttributes<HTMLUListElement> {
  children?: React.ReactNode
}

export const TreeGroup = forwardRef<HTMLUListElement, ReactTreeGroupProps>(function TreeGroup(
  { className, children, ...rest },
  ref,
) {
  const classes = treeViewGroupClasses()
  const combinedClassName = className ? `${classes} ${className}` : classes
  return (
    <ul ref={ref} role="group" className={combinedClassName} {...rest}>
      {children}
    </ul>
  )
})
