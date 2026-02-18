/** Aspect ratio for the embed container. */
export type EmbedRatio = "1/1" | "4/3" | "16/9" | "21/9"

/** Options for generating embed CSS class names. */
export interface EmbedClassesOptions {
  /** Aspect ratio of the container. @default "16/9" */
  ratio?: EmbedRatio
  /** Stretches the embed to fill its parent width. @default false */
  fullWidth?: boolean
}

/**
 * Object containing BEM class names for each embed sub-element.
 */
export interface EmbedClassesResult {
  /** Class for the container `<div>` with aspect ratio. */
  root: string
  /** Class for the `<iframe>` element (absolutely positioned to fill the container). */
  iframe: string
}

/** CSS module result (same shape). */
export interface EmbedModuleClassesResult {
  root: string
  iframe: string
}

/** Props for the Embed component. */
export interface EmbedProps extends EmbedClassesOptions {}
