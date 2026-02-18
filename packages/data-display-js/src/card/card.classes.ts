import type {
  CardClassesOptions,
  CardClassesResult,
  CardMediaClassesOptions,
} from "./card.types.js"

const BASE = "pm-card"

/**
 * Returns BEM class names for the card component (human-readable).
 * Used by CDN and template consumers.
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
 * Returns BEM class names for the card media sub-part.
 */
export function cardMediaClasses(options: CardMediaClassesOptions = {}): string {
  const { position = "top" } = options
  return `${BASE}__media ${BASE}__media--${position}`
}

/**
 * Returns CSS module class names for the card component (hashed).
 * Used by bundled/template consumers who import CSS modules.
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
 * Returns CSS module class names for the card media sub-part.
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
