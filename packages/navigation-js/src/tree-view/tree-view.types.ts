export type TreeSize = "sm" | "md"

export interface TreeClassesOptions {
  size?: TreeSize
}

export interface TreeBranchClassesOptions {
  expanded?: boolean
}

export interface TreeItemClassesOptions {
  selected?: boolean
  disabled?: boolean
}

export interface TreeIndicatorClassesOptions {
  expanded?: boolean
}
