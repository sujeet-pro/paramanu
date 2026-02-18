import type { BoxClassesOptions } from "./box.types.js"

const BASE = "pm-box"

/**
 * Returns BEM class names for the box component (human-readable).
 * Used by CDN and template consumers.
 */
export function boxClasses(_options: BoxClassesOptions = {}): string {
  return BASE
}

/**
 * Returns CSS module class names for the box component (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function boxModuleClasses(
  classMap: Record<string, string>,
  _options: BoxClassesOptions = {},
): string {
  return classMap["pm-box"] ?? ""
}
