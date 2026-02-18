import type { ShowHideClassesOptions } from "./show-hide.types.js"

export function showHideClasses(options: ShowHideClassesOptions = {}): string {
  const { display = "show" } = options
  return display === "show" ? "pm-show" : "pm-hide"
}

export function showHideModuleClasses(
  classMap: Record<string, string>,
  options: ShowHideClassesOptions = {},
): string {
  const { display = "show" } = options
  const key = display === "show" ? "pm-show" : "pm-hide"
  return classMap[key] ?? ""
}
