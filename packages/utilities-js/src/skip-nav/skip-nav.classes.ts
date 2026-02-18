const SKIP_BASE = "pm-skip-nav"
const TARGET_BASE = "pm-skip-nav-target"

export function skipNavClasses(): string {
  return SKIP_BASE
}

export function skipNavTargetClasses(): string {
  return TARGET_BASE
}

export function skipNavModuleClasses(classMap: Record<string, string>): string {
  return classMap["pm-skip-nav"] ?? ""
}

export function skipNavTargetModuleClasses(classMap: Record<string, string>): string {
  return classMap["pm-skip-nav-target"] ?? ""
}
