export type BannerVariant = "info" | "success" | "warning" | "danger"

export interface BannerClassesOptions {
  variant?: BannerVariant
  sticky?: boolean
  dismissible?: boolean
}
