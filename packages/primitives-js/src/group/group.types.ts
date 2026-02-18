import type { SpacingScale } from "../shared.types.js"

export type GroupOrientation = "horizontal" | "vertical"

export interface GroupClassesOptions {
  orientation?: GroupOrientation
  gap?: SpacingScale
  attached?: boolean
}

export interface GroupProps extends GroupClassesOptions {}
