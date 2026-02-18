import type {
  QrCodeClassesOptions,
  QrCodeClassesResult,
  QrCodeModuleClassesResult,
} from "./qr-code.types.js"

const BASE = "pm-qr-code"

/**
 * Returns BEM class names for the QR code component (human-readable).
 * Used by CDN and template consumers.
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
 * Returns CSS module class names for the QR code component (hashed).
 * Used by bundled/template consumers who import CSS modules.
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
