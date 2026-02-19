// @paramanu/primitives-js — Layout & Base Building Blocks

// Box
export { boxClasses, boxModuleClasses } from "./box/box.classes.js"
export type { BoxClassesOptions, BoxProps } from "./box/box.types.js"

// Spacer
export { spacerClasses, spacerModuleClasses } from "./spacer/spacer.classes.js"
export type { SpacerClassesOptions, SpacerProps } from "./spacer/spacer.types.js"

// Center
export { centerClasses, centerModuleClasses } from "./center/center.classes.js"
export type { CenterClassesOptions, CenterProps } from "./center/center.types.js"

// Divider
export { dividerClasses, dividerModuleClasses } from "./divider/divider.classes.js"
export type {
  DividerOrientation,
  DividerVariant,
  DividerClassesOptions,
  DividerProps,
} from "./divider/divider.types.js"

// Container
export { containerClasses, containerModuleClasses } from "./container/container.classes.js"
export type {
  ContainerSize,
  ContainerClassesOptions,
  ContainerProps,
} from "./container/container.types.js"

// Flex
export { flexClasses, flexModuleClasses } from "./flex/flex.classes.js"
export type {
  FlexDirection,
  FlexAlign,
  FlexJustify,
  FlexWrap,
  FlexClassesOptions,
  FlexProps,
} from "./flex/flex.types.js"

// Stack
export { stackClasses, stackModuleClasses } from "./stack/stack.classes.js"
export type { StackDirection, StackClassesOptions, StackProps } from "./stack/stack.types.js"

// Grid
export { gridClasses, gridModuleClasses } from "./grid/grid.classes.js"
export type {
  GridColumns,
  GridRows,
  GridClassesOptions,
  GridProps,
} from "./grid/grid.types.js"

// Simple Grid
export { sgridClasses, sgridModuleClasses } from "./simple-grid/simple-grid.classes.js"
export type {
  SgridMinChildWidth,
  SgridClassesOptions,
  SgridProps,
} from "./simple-grid/simple-grid.types.js"

// Aspect Ratio
export {
  aspectClasses,
  aspectModuleClasses,
} from "./aspect-ratio/aspect-ratio.classes.js"
export type {
  AspectValue,
  AspectClassesOptions,
  AspectProps,
} from "./aspect-ratio/aspect-ratio.types.js"

// Bleed
export { bleedClasses, bleedModuleClasses } from "./bleed/bleed.classes.js"
export type { BleedClassesOptions, BleedProps } from "./bleed/bleed.types.js"

// Splitter
export {
  splitterClasses,
  splitterModuleClasses,
  splitterPanelClasses,
  splitterPanelModuleClasses,
  splitterHandleClasses,
  splitterHandleModuleClasses,
} from "./splitter/splitter.classes.js"
export { createSplitter } from "./splitter/splitter.js"
export type {
  SplitterOrientation,
  SplitterClassesOptions,
  SplitterPanelClassesOptions,
  SplitterHandleClassesOptions,
  SplitterProps,
  SplitterPanelProps,
  SplitterHandleProps,
  CreateSplitterOptions,
  SplitterInstance,
} from "./splitter/splitter.types.js"

// Wrap
export { wrapClasses, wrapModuleClasses } from "./wrap/wrap.classes.js"
export type { WrapDirection, WrapClassesOptions, WrapProps } from "./wrap/wrap.types.js"

// Group
export { groupClasses, groupModuleClasses } from "./group/group.classes.js"
export type {
  GroupOrientation,
  GroupClassesOptions,
  GroupProps,
} from "./group/group.types.js"

// Float
export { floatClasses, floatModuleClasses } from "./float/float.classes.js"
export type {
  FloatPlacement,
  FloatOffset,
  FloatClassesOptions,
  FloatProps,
} from "./float/float.types.js"

// Scroll Area
export { scrollClasses, scrollModuleClasses } from "./scroll-area/scroll-area.classes.js"
export type {
  ScrollDirection,
  ScrollbarVisibility,
  ScrollClassesOptions,
  ScrollProps,
} from "./scroll-area/scroll-area.types.js"

// Masonry
export { masonryClasses, masonryModuleClasses } from "./masonry/masonry.classes.js"
export type {
  MasonryColumns,
  MasonryClassesOptions,
  MasonryProps,
} from "./masonry/masonry.types.js"

// Shell
export {
  shellClasses,
  shellModuleClasses,
  appShellHeaderClasses,
  appShellHeaderModuleClasses,
  appShellSidebarClasses,
  appShellSidebarModuleClasses,
  appShellMainClasses,
  appShellMainModuleClasses,
  appShellFooterClasses,
  appShellFooterModuleClasses,
} from "./app-shell/app-shell.classes.js"
export type {
  ShellSidebarWidth,
  ShellSidebarPosition,
  ShellClassesOptions,
  ShellHeaderClassesOptions,
  ShellSidebarClassesOptions,
  ShellProps,
  ShellHeaderProps,
  ShellSidebarProps,
  ShellMainProps,
  ShellFooterProps,
} from "./app-shell/app-shell.types.js"

// Shared types
export type { SpacingScale } from "./shared.types.js"
