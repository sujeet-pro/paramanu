import type {
  TreeViewClassesOptions,
  TreeViewBranchClassesOptions,
  TreeViewItemClassesOptions,
  TreeViewIndicatorClassesOptions,
} from "./tree-view.types.js"

const BASE = "pm-tree-view"

export function treeViewClasses(options: TreeViewClassesOptions = {}): string {
  const { size = "md" } = options
  const classes = [BASE, `${BASE}--${size}`]
  return classes.join(" ")
}

export function treeViewModuleClasses(
  classMap: Record<string, string>,
  options: TreeViewClassesOptions = {},
): string {
  const { size = "md" } = options
  const classes = [classMap[BASE], classMap[`${BASE}--${size}`]]
  return classes.filter(Boolean).join(" ")
}

const BRANCH_BASE = "pm-tree-view__branch"

export function treeViewBranchClasses(options: TreeViewBranchClassesOptions = {}): string {
  const { expanded = false } = options
  const classes = [BRANCH_BASE]
  if (expanded) classes.push(`${BRANCH_BASE}--expanded`)
  return classes.join(" ")
}

export function treeViewBranchModuleClasses(
  classMap: Record<string, string>,
  options: TreeViewBranchClassesOptions = {},
): string {
  const { expanded = false } = options
  const classes = [classMap[BRANCH_BASE]]
  if (expanded) classes.push(classMap[`${BRANCH_BASE}--expanded`])
  return classes.filter(Boolean).join(" ")
}

const ITEM_BASE = "pm-tree-view__item"

export function treeViewItemClasses(options: TreeViewItemClassesOptions = {}): string {
  const { selected = false, disabled = false } = options
  const classes = [ITEM_BASE]
  if (selected) classes.push(`${ITEM_BASE}--selected`)
  if (disabled) classes.push(`${ITEM_BASE}--disabled`)
  return classes.join(" ")
}

export function treeViewItemModuleClasses(
  classMap: Record<string, string>,
  options: TreeViewItemClassesOptions = {},
): string {
  const { selected = false, disabled = false } = options
  const classes = [classMap[ITEM_BASE]]
  if (selected) classes.push(classMap[`${ITEM_BASE}--selected`])
  if (disabled) classes.push(classMap[`${ITEM_BASE}--disabled`])
  return classes.filter(Boolean).join(" ")
}

const ITEM_CONTENT_BASE = "pm-tree-view__item-content"

export function treeViewItemContentClasses(): string {
  return ITEM_CONTENT_BASE
}

export function treeViewItemContentModuleClasses(classMap: Record<string, string>): string {
  return classMap[ITEM_CONTENT_BASE] || ""
}

const INDICATOR_BASE = "pm-tree-view__indicator"

export function treeViewIndicatorClasses(options: TreeViewIndicatorClassesOptions = {}): string {
  const { expanded = false } = options
  const classes = [INDICATOR_BASE]
  if (expanded) classes.push(`${INDICATOR_BASE}--expanded`)
  return classes.join(" ")
}

export function treeViewIndicatorModuleClasses(
  classMap: Record<string, string>,
  options: TreeViewIndicatorClassesOptions = {},
): string {
  const { expanded = false } = options
  const classes = [classMap[INDICATOR_BASE]]
  if (expanded) classes.push(classMap[`${INDICATOR_BASE}--expanded`])
  return classes.filter(Boolean).join(" ")
}

const GROUP_BASE = "pm-tree-view__group"

export function treeViewGroupClasses(): string {
  return GROUP_BASE
}

export function treeViewGroupModuleClasses(classMap: Record<string, string>): string {
  return classMap[GROUP_BASE] || ""
}
