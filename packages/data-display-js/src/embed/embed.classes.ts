import type {
  EmbedClassesOptions,
  EmbedClassesResult,
  EmbedModuleClassesResult,
} from "./embed.types.js"

const BASE = "pm-embed"

/** Converts ratio string to a CSS-safe class modifier (e.g. "16/9" -> "16-9"). */
function ratioModifier(ratio: string): string {
  return ratio.replace("/", "-")
}

/**
 * Returns BEM class names for the Embed component.
 *
 * Embed wraps an `<iframe>` inside a container that maintains a fixed aspect
 * ratio using CSS `aspect-ratio`. The iframe is absolutely positioned to fill
 * the container.
 *
 * @example
 * ```ts
 * const cls = embedClasses({ ratio: "4/3", fullWidth: true })
 * // cls.root   => "pm-embed pm-embed--ratio-4-3 pm-embed--full-width"
 * // cls.iframe => "pm-embed__iframe"
 * ```
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
 * Returns CSS module class names for the Embed component.
 * Used by bundled consumers who import CSS modules.
 */
export function embedModuleClasses(
  classMap: Record<string, string>,
  options: EmbedClassesOptions = {},
): EmbedModuleClassesResult {
  const { ratio = "16/9", fullWidth = false } = options

  const rootClasses = [classMap[BASE], classMap[`${BASE}--ratio-${ratioModifier(ratio)}`]]

  if (fullWidth) rootClasses.push(classMap[`${BASE}--full-width`])

  return {
    root: rootClasses.filter(Boolean).join(" "),
    iframe: classMap[`${BASE}__iframe`] ?? "",
  }
}
