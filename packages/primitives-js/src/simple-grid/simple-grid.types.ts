import type { SpacingScale } from "../shared.types.js"

export type SimpleGridMinChildWidth = "2xs" | "xs" | "sm" | "md" | "lg" | "xl"

export interface SimpleGridClassesOptions {
  minChildWidth?: SimpleGridMinChildWidth
  columns?: 1 | 2 | 3 | 4 | 5 | 6
  gap?: SpacingScale
}

export interface SimpleGridProps extends SimpleGridClassesOptions {}
