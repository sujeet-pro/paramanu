export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export type HeadingSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"

export type HeadingWeight = "normal" | "medium" | "semibold" | "bold"

export type HeadingAlign = "left" | "center" | "right"

export interface HeadingClassesOptions {
  level?: HeadingLevel
  size?: HeadingSize
  weight?: HeadingWeight
  align?: HeadingAlign
  truncate?: boolean
}
