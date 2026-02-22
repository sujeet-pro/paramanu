import type { NotifClassesOptions } from "./notification.types.js"

const BASE = "pm-notif"

/** Structured class names for the notification component and its sub-elements. */
export interface NotifClassesResult {
  /** Root element class names. */
  root: string
  /** Avatar/icon container class. */
  icon: string
  /** Content wrapper class. */
  content: string
  /** Title element class. */
  title: string
  /** Message/description element class. */
  message: string
  /** Timestamp element class. */
  timestamp: string
  /** Actions container class. */
  actions: string
  /** Close button container class. */
  close: string
}

/**
 * Returns BEM class names for the notification component (human-readable).
 * Used by CDN and template consumers.
 *
 * @example
 * ```ts
 * const classes = notifClasses({ unread: true, dismissible: true })
 * // classes.root => "pm-notif pm-notif--neutral pm-notif--unread pm-notif--dismissible"
 * ```
 */
export function notifClasses(options: NotifClassesOptions = {}): NotifClassesResult {
  const { variant = "neutral", unread = false, dismissible = false } = options
  const rootClasses = [BASE, `${BASE}--${variant}`]

  if (unread) rootClasses.push(`${BASE}--unread`)
  if (dismissible) rootClasses.push(`${BASE}--dismissible`)

  return {
    root: rootClasses.join(" "),
    icon: `${BASE}__icon`,
    content: `${BASE}__content`,
    title: `${BASE}__title`,
    message: `${BASE}__message`,
    timestamp: `${BASE}__timestamp`,
    actions: `${BASE}__actions`,
    close: `${BASE}__close`,
  }
}

/**
 * Returns CSS module class names for the notification component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function notifModuleClasses(
  classMap: Record<string, string>,
  options: NotifClassesOptions = {},
): NotifClassesResult {
  const { variant = "neutral", unread = false, dismissible = false } = options

  const rootClasses = [classMap["pm-notif"], classMap[`pm-notif--${variant}`]]

  if (unread) rootClasses.push(classMap["pm-notif--unread"])
  if (dismissible) rootClasses.push(classMap["pm-notif--dismissible"])

  return {
    root: rootClasses.filter(Boolean).join(" "),
    icon: classMap["pm-notif__icon"] ?? "",
    content: classMap["pm-notif__content"] ?? "",
    title: classMap["pm-notif__title"] ?? "",
    message: classMap["pm-notif__message"] ?? "",
    timestamp: classMap["pm-notif__timestamp"] ?? "",
    actions: classMap["pm-notif__actions"] ?? "",
    close: classMap["pm-notif__close"] ?? "",
  }
}
