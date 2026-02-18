/** Placement positions for the floating element relative to its parent. */
export type FloatPlacement =
  | "top-start"
  | "top-center"
  | "top-end"
  | "middle-start"
  | "middle-center"
  | "middle-end"
  | "bottom-start"
  | "bottom-center"
  | "bottom-end"

/** Offset amount from the edge. Uses spacing scale values. */
export type FloatOffset = "0" | "1" | "2" | "3" | "4" | "5" | "6"

export interface FloatClassesOptions {
  /** Where to position the floating element. Defaults to "top-end". */
  placement?: FloatPlacement
  /** Distance from the edge using the spacing scale. */
  offset?: FloatOffset
}

export interface FloatProps extends FloatClassesOptions {}
