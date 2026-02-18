import type { AvatarClassesOptions, AvatarClassesResult } from "./avatar.types.js"

const BASE = "pm-avatar"

/**
 * Returns BEM class names for the avatar component (human-readable).
 * Used by CDN and template consumers.
 */
export function avatarClasses(options: AvatarClassesOptions = {}): AvatarClassesResult {
  const { size = "md", variant = "circle", color = "primary" } = options

  return {
    root: [BASE, `${BASE}--${size}`, `${BASE}--${variant}`, `${BASE}--${color}`].join(" "),
    image: `${BASE}__image`,
    fallback: `${BASE}__fallback`,
  }
}

/**
 * Returns CSS module class names for the avatar component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function avatarModuleClasses(
  classMap: Record<string, string>,
  options: AvatarClassesOptions = {},
): AvatarClassesResult {
  const { size = "md", variant = "circle", color = "primary" } = options

  const root = [
    classMap["pm-avatar"],
    classMap[`pm-avatar--${size}`],
    classMap[`pm-avatar--${variant}`],
    classMap[`pm-avatar--${color}`],
  ]
    .filter(Boolean)
    .join(" ")

  return {
    root,
    image: classMap["pm-avatar__image"] ?? "",
    fallback: classMap["pm-avatar__fallback"] ?? "",
  }
}
