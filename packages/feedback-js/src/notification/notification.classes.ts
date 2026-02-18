import type { NotificationClassesOptions } from "./notification.types.js"

const BASE = "pm-notification"

export interface NotificationClassesResult {
  root: string
  icon: string
  content: string
  title: string
  message: string
  timestamp: string
  actions: string
  close: string
}

/**
 * Returns BEM class names for the notification component (human-readable).
 * Used by CDN and template consumers.
 */
export function notificationClasses(
  options: NotificationClassesOptions = {},
): NotificationClassesResult {
  const { unread = false, dismissible = false } = options
  const rootClasses = [BASE]

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
export function notificationModuleClasses(
  classMap: Record<string, string>,
  options: NotificationClassesOptions = {},
): NotificationClassesResult {
  const { unread = false, dismissible = false } = options

  const rootClasses = [classMap["pm-notification"]]

  if (unread) rootClasses.push(classMap["pm-notification--unread"])
  if (dismissible) rootClasses.push(classMap["pm-notification--dismissible"])

  return {
    root: rootClasses.filter(Boolean).join(" "),
    icon: classMap["pm-notification__icon"] ?? "",
    content: classMap["pm-notification__content"] ?? "",
    title: classMap["pm-notification__title"] ?? "",
    message: classMap["pm-notification__message"] ?? "",
    timestamp: classMap["pm-notification__timestamp"] ?? "",
    actions: classMap["pm-notification__actions"] ?? "",
    close: classMap["pm-notification__close"] ?? "",
  }
}
