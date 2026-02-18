export type SplitterOrientation = "horizontal" | "vertical"

export interface SplitterClassesOptions {
  orientation?: SplitterOrientation
  disabled?: boolean
}

export interface SplitterPanelClassesOptions {
  collapsed?: boolean
  collapsible?: boolean
}

export interface SplitterHandleClassesOptions {
  active?: boolean
  orientation?: SplitterOrientation
}

export interface SplitterProps extends SplitterClassesOptions {}

export interface SplitterPanelProps extends SplitterPanelClassesOptions {
  defaultSize?: number
  minSize?: number
  maxSize?: number
}

export interface SplitterHandleProps extends SplitterHandleClassesOptions {}

export interface CreateSplitterOptions {
  orientation?: SplitterOrientation
  onResize?: (sizes: number[]) => void
}

export interface SplitterInstance {
  destroy: () => void
}
