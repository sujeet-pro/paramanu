export interface CommandPaletteClassesOptions {}

export interface CommandPaletteInputClassesOptions {}

export interface CommandPaletteListClassesOptions {}

export interface CommandPaletteItemClassesOptions {
  active?: boolean
}

export interface CommandPaletteGroupClassesOptions {}

export interface CommandPaletteEmptyClassesOptions {}

export interface CreateCommandPaletteOptions {
  onClose?: () => void
  onSelect?: (value: string) => void
  hotkey?: string
}

export interface CommandPaletteInstance {
  open: () => void
  close: () => void
  destroy: () => void
}
