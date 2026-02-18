import type { SpacingScale } from "../shared.types.js"

export interface BleedClassesOptions {
  inline?: SpacingScale
  block?: SpacingScale
  inlineStart?: SpacingScale
  inlineEnd?: SpacingScale
  blockStart?: SpacingScale
  blockEnd?: SpacingScale
}

export interface BleedProps extends BleedClassesOptions {}
