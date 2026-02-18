import type {
  AppShellClassesOptions,
  AppShellHeaderClassesOptions,
  AppShellSidebarClassesOptions,
} from "./app-shell.types.js"

const BASE = "pm-app-shell"
const HEADER = "pm-app-shell__header"
const SIDEBAR = "pm-app-shell__sidebar"
const MAIN = "pm-app-shell__main"
const FOOTER = "pm-app-shell__footer"

/**
 * Returns BEM class names for the app shell container (human-readable).
 * Used by CDN and template consumers.
 */
export function appShellClasses(options: AppShellClassesOptions = {}): string {
  const { sidebarCollapsed, sidebarPosition = "start" } = options
  const classes = [BASE, `${BASE}--sidebar-${sidebarPosition}`]

  if (sidebarCollapsed) classes.push(`${BASE}--sidebar-collapsed`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the app shell container (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function appShellModuleClasses(
  classMap: Record<string, string>,
  options: AppShellClassesOptions = {},
): string {
  const { sidebarCollapsed, sidebarPosition = "start" } = options

  const classes = [classMap[BASE], classMap[`${BASE}--sidebar-${sidebarPosition}`]]

  if (sidebarCollapsed) classes.push(classMap[`${BASE}--sidebar-collapsed`])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for the app shell header (human-readable).
 */
export function appShellHeaderClasses(options: AppShellHeaderClassesOptions = {}): string {
  const { sticky } = options
  const classes = [HEADER]

  if (sticky) classes.push(`${HEADER}--sticky`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the app shell header (hashed).
 */
export function appShellHeaderModuleClasses(
  classMap: Record<string, string>,
  options: AppShellHeaderClassesOptions = {},
): string {
  const { sticky } = options

  const classes = [classMap[HEADER]]

  if (sticky) classes.push(classMap[`${HEADER}--sticky`])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for the app shell sidebar (human-readable).
 */
export function appShellSidebarClasses(options: AppShellSidebarClassesOptions = {}): string {
  const { width = "md", collapsed } = options
  const classes = [SIDEBAR, `${SIDEBAR}--${width}`]

  if (collapsed) classes.push(`${SIDEBAR}--collapsed`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the app shell sidebar (hashed).
 */
export function appShellSidebarModuleClasses(
  classMap: Record<string, string>,
  options: AppShellSidebarClassesOptions = {},
): string {
  const { width = "md", collapsed } = options

  const classes = [classMap[SIDEBAR], classMap[`${SIDEBAR}--${width}`]]

  if (collapsed) classes.push(classMap[`${SIDEBAR}--collapsed`])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for the app shell main area (human-readable).
 */
export function appShellMainClasses(): string {
  return MAIN
}

/**
 * Returns CSS module class names for the app shell main area (hashed).
 */
export function appShellMainModuleClasses(classMap: Record<string, string>): string {
  return classMap[MAIN] || ""
}

/**
 * Returns BEM class names for the app shell footer (human-readable).
 */
export function appShellFooterClasses(): string {
  return FOOTER
}

/**
 * Returns CSS module class names for the app shell footer (hashed).
 */
export function appShellFooterModuleClasses(classMap: Record<string, string>): string {
  return classMap[FOOTER] || ""
}
