import type { AvatarGrpClassesOptions, AvatarGrpClassesResult } from "./avatar-group.types.js"

const BASE = "pm-avatar-grp"

/**
 * Returns BEM class names for the AvatarGrp component.
 *
 * Renders a row of overlapping avatars using `flex-direction: row-reverse`
 * with negative margins for the overlap effect.
 *
 * @example
 * ```ts
 * const cls = avatarGrpClasses({ size: "lg", spacing: "tight" })
 * // cls.root     => "pm-avatar-grp pm-avatar-grp--lg pm-avatar-grp--spacing-tight"
 * // cls.overflow => "pm-avatar-grp__overflow"
 * ```
 */
export function avatarGrpClasses(options: AvatarGrpClassesOptions = {}): AvatarGrpClassesResult {
  const { size = "md", spacing = "normal" } = options

  return {
    root: [BASE, `${BASE}--${size}`, `${BASE}--spacing-${spacing}`].join(" "),
    overflow: `${BASE}__overflow`,
  }
}

/**
 * Returns CSS module class names for the AvatarGrp component.
 * Used by bundled consumers who import CSS modules.
 */
export function avatarGrpModuleClasses(
  classMap: Record<string, string>,
  options: AvatarGrpClassesOptions = {},
): AvatarGrpClassesResult {
  const { size = "md", spacing = "normal" } = options

  return {
    root: [classMap[BASE], classMap[`${BASE}--${size}`], classMap[`${BASE}--spacing-${spacing}`]]
      .filter(Boolean)
      .join(" "),
    overflow: classMap[`${BASE}__overflow`] || "",
  }
}
