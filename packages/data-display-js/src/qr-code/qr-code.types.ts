export type QrCodeSize = "sm" | "md" | "lg" | "xl"

export interface QrCodeClassesOptions {
  size?: QrCodeSize
}

export interface QrCodeClassesResult {
  root: string
  svg: string
}

export interface QrCodeModuleClassesResult {
  root: string
  svg: string
}

export interface QrCodeProps extends QrCodeClassesOptions {}
