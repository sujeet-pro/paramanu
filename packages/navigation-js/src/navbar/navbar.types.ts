/** Visual style variant for the navbar */
export type NavbarVariant = "default" | "floating" | "bordered"

/** CSS position property for the navbar */
export type NavbarPosition = "static" | "sticky" | "fixed"

/**
 * Options for generating navbar container CSS class names.
 * Used by both BEM (`navbarClasses`) and CSS module (`navbarModuleClasses`) builders.
 */
export interface NavbarClassesOptions {
  /** Visual style variant. @default "default" */
  variant?: NavbarVariant
  /** Position behavior of the navbar. @default "static" */
  position?: NavbarPosition
}

/** Alignment of a navbar section */
export type NavbarSectionAlign = "start" | "center" | "end"

/**
 * Options for generating navbar section CSS class names.
 * Sections divide the navbar into start, center, and end areas.
 */
export interface NavbarSectionClassesOptions {
  /** Alignment of this section within the navbar. @default "start" */
  align?: NavbarSectionAlign
}
