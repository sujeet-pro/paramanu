import type {
  AvatarGroupClassesOptions,
  AvatarGroupClassesResult,
} from "./avatar-group.types.js"

const BASE = "pm-avatar-group"

/**
 * Returns BEM class names for the AvatarGroup component.
 *
 * Renders a row of overlapping avatars using `flex-direction: row-reverse`
 * with negative margins for the overlap effect.
 *
 * @example
 * ```ts
 * const cls = avatarGroupClasses({ size: "lg", spacing: "tight" })
 * // cls.root     => "pm-avatar-group pm-avatar-group--lg pm-avatar-group--spacing-tight"
 * // cls.overflow => "pm-avatar-group__overflow"
 * ```
 */
export function avatarGroupClasses(
  options: AvatarGroupClassesOptions = {},
): AvatarGroupClassesResult {
  const { size = "md", spacing = "normal" } = options

  return {
    root: [BASE, `${BASE}--${size}`, `${BASE}--spacing-${spacing}`].join(" "),
    overflow: `${BASE}__overflow`,
  }
}

/**
 * Returns CSS module class names for the AvatarGroup component.
 * Used by bundled consumers who import CSS modules.
 */
export function avatarGroupModuleClasses(
  classMap: Record<string, string>,
  options: AvatarGroupClassesOptions = {},
): AvatarGroupClassesResult {
  const { size = "md", spacing = "normal" } = options

  return {
    root: [classMap[BASE], classMap[`${BASE}--${size}`], classMap[`${BASE}--spacing-${spacing}`]]
      .filter(Boolean)
      .join(" "),
    overflow: classMap[`${BASE}__overflow`] || "",
  }
}
