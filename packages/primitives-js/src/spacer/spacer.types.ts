import type { SpacingScale } from "../shared.types.js"

export interface SpacerClassesOptions {
  /** Fixed size for the spacer using the spacing scale. When not set, spacer grows to fill available space. */
  size?: SpacingScale
  /** Direction the spacer should take size in. Defaults to both axes (flex: 1). */
  axis?: "horizontal" | "vertical"
}

export interface SpacerProps extends SpacerClassesOptions {}
