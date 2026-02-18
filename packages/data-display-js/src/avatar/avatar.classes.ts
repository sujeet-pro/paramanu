import type { AvatarClassesOptions, AvatarClassesResult } from "./avatar.types.js"

const BASE = "pm-avatar"

/**
 * Returns BEM class names for the Avatar component.
 *
 * Avatars display a user image with a fallback to initials or an icon.
 * They are rendered as a `<span role="img">` with an inner `<img>` or
 * a fallback `<span>`.
 *
 * @example
 * ```ts
 * const cls = avatarClasses({ size: "lg", variant: "square", color: "success" })
 * // cls.root     => "pm-avatar pm-avatar--lg pm-avatar--square pm-avatar--success"
 * // cls.image    => "pm-avatar__image"
 * // cls.fallback => "pm-avatar__fallback"
 * ```
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
 * Returns CSS module class names for the Avatar component.
 * Used by bundled consumers who import CSS modules.
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
