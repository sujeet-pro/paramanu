import type {
  CardClassesOptions,
  CardClassesResult,
  CardMediaClassesOptions,
} from "./card.types.js"

const BASE = "pm-card"

/**
 * Returns BEM class names for the Card component.
 *
 * @example
 * ```ts
 * const cls = cardClasses({ variant: "outline", size: "lg" })
 * // cls.root  => "pm-card pm-card--outline pm-card--lg"
 * // cls.header => "pm-card__header"
 * ```
 */
export function cardClasses(options: CardClassesOptions = {}): CardClassesResult {
  const {
    variant = "elevated",
    size = "md",
    interactive = false,
    fullWidth = false,
    horizontal = false,
  } = options

  const rootClasses = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`]

  if (interactive) rootClasses.push(`${BASE}--interactive`)
  if (fullWidth) rootClasses.push(`${BASE}--full-width`)
  if (horizontal) rootClasses.push(`${BASE}--horizontal`)

  return {
    root: rootClasses.join(" "),
    header: `${BASE}__header`,
    body: `${BASE}__body`,
    footer: `${BASE}__footer`,
    media: `${BASE}__media`,
  }
}

/**
 * Returns BEM class names for the Card media sub-element with position modifier.
 *
 * @example
 * ```ts
 * cardMediaClasses({ position: "bottom" })
 * // => "pm-card__media pm-card__media--bottom"
 * ```
 */
export function cardMediaClasses(options: CardMediaClassesOptions = {}): string {
  const { position = "top" } = options
  return `${BASE}__media ${BASE}__media--${position}`
}

/**
 * Returns CSS module class names for the Card component.
 * Used by bundled consumers who import CSS modules.
 */
export function cardModuleClasses(
  classMap: Record<string, string>,
  options: CardClassesOptions = {},
): CardClassesResult {
  const {
    variant = "elevated",
    size = "md",
    interactive = false,
    fullWidth = false,
    horizontal = false,
  } = options

  const rootClasses = [
    classMap["pm-card"],
    classMap[`pm-card--${variant}`],
    classMap[`pm-card--${size}`],
  ]

  if (interactive) rootClasses.push(classMap["pm-card--interactive"])
  if (fullWidth) rootClasses.push(classMap["pm-card--full-width"])
  if (horizontal) rootClasses.push(classMap["pm-card--horizontal"])

  return {
    root: rootClasses.filter(Boolean).join(" "),
    header: classMap["pm-card__header"] ?? "",
    body: classMap["pm-card__body"] ?? "",
    footer: classMap["pm-card__footer"] ?? "",
    media: classMap["pm-card__media"] ?? "",
  }
}

/**
 * Returns CSS module class names for the Card media sub-element.
 */
export function cardMediaModuleClasses(
  classMap: Record<string, string>,
  options: CardMediaClassesOptions = {},
): string {
  const { position = "top" } = options
  return [classMap["pm-card__media"], classMap[`pm-card__media--${position}`]]
    .filter(Boolean)
    .join(" ")
}
