import type { NavbarClassesOptions, NavbarSectionClassesOptions } from "./navbar.types.js"

const BASE = "pm-navbar"

export function navbarClasses(options: NavbarClassesOptions = {}): string {
  const { variant = "default", position = "static" } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${position}`]
  return classes.join(" ")
}

export function navbarModuleClasses(
  classMap: Record<string, string>,
  options: NavbarClassesOptions = {},
): string {
  const { variant = "default", position = "static" } = options
  const classes = [classMap[BASE], classMap[`${BASE}--${variant}`], classMap[`${BASE}--${position}`]]
  return classes.filter(Boolean).join(" ")
}

const INNER_BASE = "pm-navbar__inner"

export function navbarInnerClasses(): string {
  return INNER_BASE
}

export function navbarInnerModuleClasses(classMap: Record<string, string>): string {
  return classMap[INNER_BASE] || ""
}

const SECTION_BASE = "pm-navbar__section"

export function navbarSectionClasses(options: NavbarSectionClassesOptions = {}): string {
  const { align = "start" } = options
  const classes = [SECTION_BASE, `${SECTION_BASE}--${align}`]
  return classes.join(" ")
}

export function navbarSectionModuleClasses(
  classMap: Record<string, string>,
  options: NavbarSectionClassesOptions = {},
): string {
  const { align = "start" } = options
  const classes = [classMap[SECTION_BASE], classMap[`${SECTION_BASE}--${align}`]]
  return classes.filter(Boolean).join(" ")
}

const BRAND_BASE = "pm-navbar__brand"

export function navbarBrandClasses(): string {
  return BRAND_BASE
}

export function navbarBrandModuleClasses(classMap: Record<string, string>): string {
  return classMap[BRAND_BASE] || ""
}

const TOGGLE_BASE = "pm-navbar__toggle"

export function navbarToggleClasses(): string {
  return TOGGLE_BASE
}

export function navbarToggleModuleClasses(classMap: Record<string, string>): string {
  return classMap[TOGGLE_BASE] || ""
}
