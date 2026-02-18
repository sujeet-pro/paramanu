export type LinkVariant = "default" | "subtle" | "nav"

export interface LinkClassesOptions {
  variant?: LinkVariant
  active?: boolean
  disabled?: boolean
  external?: boolean
}

export interface LinkProps extends LinkClassesOptions {
  href?: string
}
