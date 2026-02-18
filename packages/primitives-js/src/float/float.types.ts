export type FloatPlacement =
  | "top-start"
  | "top-center"
  | "top-end"
  | "middle-start"
  | "middle-end"
  | "bottom-start"
  | "bottom-center"
  | "bottom-end"

export type FloatOffset = "0" | "1" | "2" | "3" | "4"

export interface FloatClassesOptions {
  placement?: FloatPlacement
  offset?: FloatOffset
}

export interface FloatProps extends FloatClassesOptions {}
