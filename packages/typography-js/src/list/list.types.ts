export type ListType = "ordered" | "unordered"

export type ListStyleType =
  | "disc"
  | "circle"
  | "square"
  | "decimal"
  | "lower-alpha"
  | "upper-alpha"
  | "lower-roman"
  | "upper-roman"

export type ListSpacing = "sm" | "md" | "lg"

export interface ListClassesOptions {
  type?: ListType
  styleType?: ListStyleType
  spacing?: ListSpacing
  unstyled?: boolean
}
