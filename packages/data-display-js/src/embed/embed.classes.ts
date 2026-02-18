import type {
  EmbedClassesOptions,
  EmbedClassesResult,
  EmbedModuleClassesResult,
} from "./embed.types.js"

const BASE = "pm-embed"

/** Converts ratio string to a CSS-safe class modifier. */
function ratioModifier(ratio: string): string {
  return ratio.replace("/", "-")
}

/**
 * Returns BEM class names for the embed component (human-readable).
 * Used by CDN and template consumers.
 */
export function embedClasses(options: EmbedClassesOptions = {}): EmbedClassesResult {
  const { ratio = "16/9", fullWidth = false } = options

  const rootClasses = [BASE, `${BASE}--ratio-${ratioModifier(ratio)}`]

  if (fullWidth) rootClasses.push(`${BASE}--full-width`)

  return {
    root: rootClasses.join(" "),
    iframe: `${BASE}__iframe`,
  }
}

/**
 * Returns CSS module class names for the embed component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function embedModuleClasses(
  classMap: Record<string, string>,
  options: EmbedClassesOptions = {},
): EmbedModuleClassesResult {
  const { ratio = "16/9", fullWidth = false } = options

  const rootClasses = [
    classMap[BASE],
    classMap[`${BASE}--ratio-${ratioModifier(ratio)}`],
  ]

  if (fullWidth) rootClasses.push(classMap[`${BASE}--full-width`])

  return {
    root: rootClasses.filter(Boolean).join(" "),
    iframe: classMap[`${BASE}__iframe`] ?? "",
  }
}
