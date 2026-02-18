import type { SpacingScale } from "../shared.types.js"

export type MasonryColumns = 2 | 3 | 4 | 5 | 6

export interface MasonryClassesOptions {
  columns?: MasonryColumns
  gap?: SpacingScale
}

export interface MasonryProps extends MasonryClassesOptions {}
