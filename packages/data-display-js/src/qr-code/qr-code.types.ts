/** Rendered size of the QR code container. */
export type QrCodeSize = "sm" | "md" | "lg" | "xl"

/** Options for generating QR code CSS class names. */
export interface QrCodeClassesOptions {
  /** Rendered size of the container. @default "md" */
  size?: QrCodeSize
}

/**
 * Object containing BEM class names for each QR code sub-element.
 * The actual QR code generation is left to the consumer; this component
 * provides the styled container and SVG wrapper.
 */
export interface QrCodeClassesResult {
  /** Class for the outer container `<div role="img">`. */
  root: string
  /** Class for the inner `<svg>` element. */
  svg: string
}

/** CSS module result (same shape). */
export interface QrCodeModuleClassesResult {
  root: string
  svg: string
}

/** Props for the QrCode component. */
export interface QrCodeProps extends QrCodeClassesOptions {}
