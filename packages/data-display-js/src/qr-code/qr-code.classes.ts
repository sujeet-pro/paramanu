import type {
  QrCodeClassesOptions,
  QrCodeClassesResult,
  QrCodeModuleClassesResult,
} from "./qr-code.types.js"

const BASE = "pm-qr-code"

/**
 * Returns BEM class names for the QrCode component.
 *
 * Provides a styled container with a white background and padding for
 * a QR code SVG. The actual QR matrix generation is left to the consumer
 * (e.g. `qrcode` or `uqr` libraries).
 *
 * @example
 * ```ts
 * const cls = qrCodeClasses({ size: "lg" })
 * // cls.root => "pm-qr-code pm-qr-code--lg"
 * // cls.svg  => "pm-qr-code__svg"
 * ```
 */
export function qrCodeClasses(options: QrCodeClassesOptions = {}): QrCodeClassesResult {
  const { size = "md" } = options

  const rootClasses = [BASE, `${BASE}--${size}`]

  return {
    root: rootClasses.join(" "),
    svg: `${BASE}__svg`,
  }
}

/**
 * Returns CSS module class names for the QrCode component.
 * Used by bundled consumers who import CSS modules.
 */
export function qrCodeModuleClasses(
  classMap: Record<string, string>,
  options: QrCodeClassesOptions = {},
): QrCodeModuleClassesResult {
  const { size = "md" } = options

  const rootClasses = [classMap[BASE], classMap[`${BASE}--${size}`]]

  return {
    root: rootClasses.filter(Boolean).join(" "),
    svg: classMap[`${BASE}__svg`] ?? "",
  }
}
