export type TreeViewSize = "sm" | "md"

export interface TreeViewClassesOptions {
  size?: TreeViewSize
}

export interface TreeViewBranchClassesOptions {
  expanded?: boolean
}

export interface TreeViewItemClassesOptions {
  selected?: boolean
  disabled?: boolean
}

export interface TreeViewIndicatorClassesOptions {
  expanded?: boolean
}
