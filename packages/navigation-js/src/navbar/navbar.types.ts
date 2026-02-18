export type NavbarVariant = "default" | "floating" | "bordered"

export type NavbarPosition = "static" | "sticky" | "fixed"

export interface NavbarClassesOptions {
  variant?: NavbarVariant
  position?: NavbarPosition
}

export type NavbarSectionAlign = "start" | "center" | "end"

export interface NavbarSectionClassesOptions {
  align?: NavbarSectionAlign
}
