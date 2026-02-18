import type {
  AvatarGroupClassesOptions,
  AvatarGroupClassesResult,
} from "./avatar-group.types.js"

const BASE = "pm-avatar-group"

export function avatarGroupClasses(
  options: AvatarGroupClassesOptions = {},
): AvatarGroupClassesResult {
  const { size = "md", spacing = "normal" } = options

  return {
    root: [BASE, `${BASE}--${size}`, `${BASE}--spacing-${spacing}`].join(" "),
    overflow: `${BASE}__overflow`,
  }
}

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
