import type { TagClassesOptions, TagClassesResult } from "./tag.types.js"

const BASE = "pm-tag"

/**
 * Returns BEM class names for the Tag (Chip) component.
 *
 * Tags are labeled elements that can optionally be removed, clicked,
 * or disabled. They support filled, outline, and subtle visual styles
 * with multiple color palettes.
 *
 * @example
 * ```ts
 * const cls = tagClasses({ variant: "outline", color: "danger", removable: true })
 * // cls.root   => "pm-tag pm-tag--outline pm-tag--md pm-tag--danger pm-tag--removable"
 * // cls.remove => "pm-tag__remove"
 * ```
 */
export function tagClasses(options: TagClassesOptions = {}): TagClassesResult {
  const {
    variant = "filled",
    size = "md",
    color = "primary",
    removable = false,
    interactive = false,
    disabled = false,
  } = options

  const rootClasses = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`, `${BASE}--${color}`]
  if (removable) rootClasses.push(`${BASE}--removable`)
  if (interactive) rootClasses.push(`${BASE}--interactive`)
  if (disabled) rootClasses.push(`${BASE}--disabled`)

  return {
    root: rootClasses.join(" "),
    remove: `${BASE}__remove`,
  }
}

/**
 * Returns CSS module class names for the Tag component.
 * Used by bundled consumers who import CSS modules.
 */
export function tagModuleClasses(
  classMap: Record<string, string>,
  options: TagClassesOptions = {},
): TagClassesResult {
  const {
    variant = "filled",
    size = "md",
    color = "primary",
    removable = false,
    interactive = false,
    disabled = false,
  } = options

  const rootClasses = [
    classMap[BASE],
    classMap[`${BASE}--${variant}`],
    classMap[`${BASE}--${size}`],
    classMap[`${BASE}--${color}`],
  ]
  if (removable) rootClasses.push(classMap[`${BASE}--removable`])
  if (interactive) rootClasses.push(classMap[`${BASE}--interactive`])
  if (disabled) rootClasses.push(classMap[`${BASE}--disabled`])

  return {
    root: rootClasses.filter(Boolean).join(" "),
    remove: classMap[`${BASE}__remove`] || "",
  }
}
