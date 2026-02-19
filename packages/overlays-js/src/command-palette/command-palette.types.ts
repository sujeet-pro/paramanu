export interface CmdPaletteClassesOptions {}

export interface CmdPaletteInputClassesOptions {}

export interface CmdPaletteListClassesOptions {}

export interface CmdPaletteItemClassesOptions {
  active?: boolean
}

export interface CmdPaletteGroupClassesOptions {}

export interface CmdPaletteEmptyClassesOptions {}

export interface CreateCmdPaletteOptions {
  onClose?: () => void
  onSelect?: (value: string) => void
  hotkey?: string
}

export interface CmdPaletteInstance {
  open: () => void
  close: () => void
  destroy: () => void
}
