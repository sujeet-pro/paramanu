const BASE = "pm-skip-nav-link"

export function skipNavLinkClasses(): string {
  return BASE
}

export function skipNavLinkModuleClasses(classMap: Record<string, string>): string {
  return classMap["pm-skip-nav-link"] ?? ""
}
