import type { ToastClassesOptions, ToastContainerClassesOptions } from "./toast.types.js"

const BASE = "pm-toast"
const CONTAINER_BASE = "pm-toast-container"

export interface ToastClassesResult {
  root: string
  icon: string
  content: string
  message: string
  close: string
}

/**
 * Returns BEM class names for the toast component (human-readable).
 * Used by CDN and template consumers.
 */
export function toastClasses(options: ToastClassesOptions = {}): ToastClassesResult {
  const { variant = "info", dismissible = false, entering = false, exiting = false } = options
  const rootClasses = [BASE, `${BASE}--${variant}`]

  if (dismissible) rootClasses.push(`${BASE}--dismissible`)
  if (entering) rootClasses.push(`${BASE}--entering`)
  if (exiting) rootClasses.push(`${BASE}--exiting`)

  return {
    root: rootClasses.join(" "),
    icon: `${BASE}__icon`,
    content: `${BASE}__content`,
    message: `${BASE}__message`,
    close: `${BASE}__close`,
  }
}

/**
 * Returns CSS module class names for the toast component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function toastModuleClasses(
  classMap: Record<string, string>,
  options: ToastClassesOptions = {},
): ToastClassesResult {
  const { variant = "info", dismissible = false, entering = false, exiting = false } = options

  const rootClasses = [classMap["pm-toast"], classMap[`pm-toast--${variant}`]]

  if (dismissible) rootClasses.push(classMap["pm-toast--dismissible"])
  if (entering) rootClasses.push(classMap["pm-toast--entering"])
  if (exiting) rootClasses.push(classMap["pm-toast--exiting"])

  return {
    root: rootClasses.filter(Boolean).join(" "),
    icon: classMap["pm-toast__icon"] ?? "",
    content: classMap["pm-toast__content"] ?? "",
    message: classMap["pm-toast__message"] ?? "",
    close: classMap["pm-toast__close"] ?? "",
  }
}

/**
 * Returns BEM class names for the toast container (human-readable).
 */
export function toastContainerClasses(options: ToastContainerClassesOptions = {}): string {
  const { placement = "top-right" } = options
  return `${CONTAINER_BASE} ${CONTAINER_BASE}--${placement}`
}

/**
 * Returns CSS module class names for the toast container (hashed).
 */
export function toastContainerModuleClasses(
  classMap: Record<string, string>,
  options: ToastContainerClassesOptions = {},
): string {
  const { placement = "top-right" } = options
  return [classMap["pm-toast-container"], classMap[`pm-toast-container--${placement}`]]
    .filter(Boolean)
    .join(" ")
}
