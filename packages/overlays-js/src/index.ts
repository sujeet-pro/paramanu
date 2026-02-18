// @paramanu/overlays-js — Overlays & Floating UI
// Components: Dialog, Alert Dialog, Drawer, Sheet, Popover, Tooltip, Hover Card,
//   Inline Dialog, Backdrop, Command Palette

// Backdrop
export { backdropClasses, backdropModuleClasses } from "./backdrop/backdrop.classes.js"
export type { BackdropVariant, BackdropClassesOptions } from "./backdrop/backdrop.types.js"

// Dialog
export {
  dialogClasses,
  dialogModuleClasses,
  dialogHeaderClasses,
  dialogHeaderModuleClasses,
  dialogBodyClasses,
  dialogBodyModuleClasses,
  dialogFooterClasses,
  dialogFooterModuleClasses,
} from "./dialog/dialog.classes.js"
export { createDialog } from "./dialog/dialog.js"
export type {
  DialogSize,
  DialogScrollBehavior,
  DialogClassesOptions,
  DialogHeaderClassesOptions,
  DialogBodyClassesOptions,
  DialogFooterClassesOptions,
  CreateDialogOptions,
  DialogInstance,
} from "./dialog/dialog.types.js"

// Alert Dialog
export {
  alertDialogClasses,
  alertDialogModuleClasses,
  alertDialogHeaderClasses,
  alertDialogHeaderModuleClasses,
  alertDialogBodyClasses,
  alertDialogBodyModuleClasses,
  alertDialogFooterClasses,
  alertDialogFooterModuleClasses,
} from "./alert-dialog/alert-dialog.classes.js"
export { createAlertDialog } from "./alert-dialog/alert-dialog.js"
export type {
  AlertDialogVariant,
  AlertDialogClassesOptions,
  AlertDialogHeaderClassesOptions,
  AlertDialogBodyClassesOptions,
  AlertDialogFooterClassesOptions,
  CreateAlertDialogOptions,
  AlertDialogInstance,
} from "./alert-dialog/alert-dialog.types.js"

// Inline Dialog
export {
  inlineDialogClasses,
  inlineDialogModuleClasses,
  inlineDialogBodyClasses,
  inlineDialogBodyModuleClasses,
} from "./inline-dialog/inline-dialog.classes.js"
export type {
  InlineDialogClassesOptions,
  InlineDialogBodyClassesOptions,
} from "./inline-dialog/inline-dialog.types.js"

// Drawer
export {
  drawerClasses,
  drawerModuleClasses,
  drawerHeaderClasses,
  drawerHeaderModuleClasses,
  drawerBodyClasses,
  drawerBodyModuleClasses,
  drawerFooterClasses,
  drawerFooterModuleClasses,
} from "./drawer/drawer.classes.js"
export { createDrawer } from "./drawer/drawer.js"
export type {
  DrawerPlacement,
  DrawerSize,
  DrawerClassesOptions,
  DrawerHeaderClassesOptions,
  DrawerBodyClassesOptions,
  DrawerFooterClassesOptions,
  CreateDrawerOptions,
  DrawerInstance,
} from "./drawer/drawer.types.js"

// Sheet
export {
  sheetClasses,
  sheetModuleClasses,
  sheetHeaderClasses,
  sheetHeaderModuleClasses,
  sheetBodyClasses,
  sheetBodyModuleClasses,
  sheetHandleClasses,
  sheetHandleModuleClasses,
} from "./sheet/sheet.classes.js"
export { createSheet } from "./sheet/sheet.js"
export type {
  SheetSize,
  SheetClassesOptions,
  SheetHeaderClassesOptions,
  SheetBodyClassesOptions,
  SheetHandleClassesOptions,
  CreateSheetOptions,
  SheetInstance,
} from "./sheet/sheet.types.js"

// Popover
export {
  popoverClasses,
  popoverModuleClasses,
  popoverArrowClasses,
  popoverArrowModuleClasses,
} from "./popover/popover.classes.js"
export { createPopover } from "./popover/popover.js"
export type {
  PopoverPlacement,
  PopoverClassesOptions,
  PopoverArrowClassesOptions,
  CreatePopoverOptions,
  PopoverInstance,
} from "./popover/popover.types.js"

// Tooltip
export {
  tooltipClasses,
  tooltipModuleClasses,
  tooltipArrowClasses,
  tooltipArrowModuleClasses,
} from "./tooltip/tooltip.classes.js"
export { createTooltip } from "./tooltip/tooltip.js"
export type {
  TooltipPlacement,
  TooltipClassesOptions,
  TooltipArrowClassesOptions,
  CreateTooltipOptions,
  TooltipInstance,
} from "./tooltip/tooltip.types.js"

// Hover Card
export {
  hoverCardClasses,
  hoverCardModuleClasses,
  hoverCardArrowClasses,
  hoverCardArrowModuleClasses,
} from "./hover-card/hover-card.classes.js"
export { createHoverCard } from "./hover-card/hover-card.js"
export type {
  HoverCardPlacement,
  HoverCardClassesOptions,
  HoverCardArrowClassesOptions,
  CreateHoverCardOptions,
  HoverCardInstance,
} from "./hover-card/hover-card.types.js"

// Command Palette
export {
  commandPaletteClasses,
  commandPaletteModuleClasses,
  commandPaletteInputClasses,
  commandPaletteInputModuleClasses,
  commandPaletteListClasses,
  commandPaletteListModuleClasses,
  commandPaletteItemClasses,
  commandPaletteItemModuleClasses,
  commandPaletteGroupClasses,
  commandPaletteGroupModuleClasses,
  commandPaletteEmptyClasses,
  commandPaletteEmptyModuleClasses,
} from "./command-palette/command-palette.classes.js"
export { createCommandPalette } from "./command-palette/command-palette.js"
export type {
  CommandPaletteClassesOptions,
  CommandPaletteInputClassesOptions,
  CommandPaletteListClassesOptions,
  CommandPaletteItemClassesOptions,
  CommandPaletteGroupClassesOptions,
  CommandPaletteEmptyClassesOptions,
  CreateCommandPaletteOptions,
  CommandPaletteInstance,
} from "./command-palette/command-palette.types.js"
