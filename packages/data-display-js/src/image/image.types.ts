/** CSS `object-fit` value for the image. */
export type ImgFit = "cover" | "contain" | "fill" | "none" | "scale-down"

/** Border radius preset for the image container. */
export type ImgRadius = "none" | "sm" | "md" | "lg" | "xl" | "full"

/** Options for generating image CSS class names. */
export interface ImgClassesOptions {
  /** How the image should be fitted within its container. @default "cover" */
  fit?: ImgFit
  /** Border radius preset. @default "none" */
  radius?: ImgRadius
  /** Whether the fallback placeholder is shown. @default false */
  fallback?: boolean
  /** Whether the image is in a loading state (skeleton pulse). @default false */
  loading?: boolean
}

/**
 * Object containing BEM class names for each image sub-element.
 * Renders as a `<figure>` with an optional `<figcaption>`.
 */
export interface ImgClassesResult {
  /** Class for the `<figure>` wrapper. */
  root: string
  /** Class for the `<img>` element. */
  img: string
  /** Class for the fallback placeholder `<div>`. */
  fallback: string
  /** Class for the `<figcaption>` element. */
  caption: string
}

/** Props for the Img component. */
export interface ImgProps extends ImgClassesOptions {
  /** Img source URL. */
  src?: string
  /** Alt text for the image (required for accessibility). */
  alt?: string
  /** Optional caption text rendered as a `<figcaption>`. */
  caption?: string
}
