import type { SpacerClassesOptions } from "./spacer.types.js"

const BASE = "pm-spacer"

/**
 * Returns BEM class names for the spacer component (human-readable).
 * Used by CDN and template consumers.
 */
export function spacerClasses(_options: SpacerClassesOptions = {}): string {
  return BASE
}

/**
 * Returns CSS module class names for the spacer component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function spacerModuleClasses(
  classMap: Record<string, string>,
  _options: SpacerClassesOptions = {},
): string {
  return classMap["pm-spacer"] ?? ""
}
