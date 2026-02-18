export type DividerOrientation = "horizontal" | "vertical"

export type DividerVariant = "solid" | "dashed" | "dotted"

export interface DividerClassesOptions {
  orientation?: DividerOrientation
  variant?: DividerVariant
}

export interface DividerProps extends DividerClassesOptions {}
