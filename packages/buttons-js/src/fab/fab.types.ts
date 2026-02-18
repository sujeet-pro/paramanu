export type FabSize = "sm" | "md" | "lg"

export type FabPosition = "bottom-right" | "bottom-left" | "bottom-center"

export interface FabClassesOptions {
  size?: FabSize
  position?: FabPosition
  extended?: boolean
  disabled?: boolean
}

export interface FabProps extends FabClassesOptions {}
