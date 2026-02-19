const BASE = "pm-skip-link"

export function skipLinkClasses(): string {
  return BASE
}

export function skipLinkModuleClasses(classMap: Record<string, string>): string {
  return classMap["pm-skip-link"] ?? ""
}
