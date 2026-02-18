import type { SpacingScale } from "../shared.types.js"

export interface BleedClassesOptions {
  /** Negative margin on both inline (left/right) sides. */
  inline?: SpacingScale
  /** Negative margin on both block (top/bottom) sides. */
  block?: SpacingScale
  /** Negative margin on the inline-start (left in LTR) side. */
  inlineStart?: SpacingScale
  /** Negative margin on the inline-end (right in LTR) side. */
  inlineEnd?: SpacingScale
  /** Negative margin on the block-start (top) side. */
  blockStart?: SpacingScale
  /** Negative margin on the block-end (bottom) side. */
  blockEnd?: SpacingScale
}

export interface BleedProps extends BleedClassesOptions {}
