import type {
  TabsClassesOptions,
  TabListClassesOptions,
  TabClassesOptions,
  TabPanelClassesOptions,
} from "./tabs.types.js"

const BASE = "pm-tabs"

export function tabsClasses(options: TabsClassesOptions = {}): string {
  const { variant = "line", size = "md", orientation = "horizontal", fitted = false } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`, `${BASE}--${orientation}`]
  if (fitted) classes.push(`${BASE}--fitted`)
  return classes.join(" ")
}

export function tabsModuleClasses(
  classMap: Record<string, string>,
  options: TabsClassesOptions = {},
): string {
  const { variant = "line", size = "md", orientation = "horizontal", fitted = false } = options
  const classes = [
    classMap[BASE],
    classMap[`${BASE}--${variant}`],
    classMap[`${BASE}--${size}`],
    classMap[`${BASE}--${orientation}`],
  ]
  if (fitted) classes.push(classMap[`${BASE}--fitted`])
  return classes.filter(Boolean).join(" ")
}

const LIST_BASE = "pm-tabs__list"

export function tabListClasses(_options: TabListClassesOptions = {}): string {
  return LIST_BASE
}

export function tabListModuleClasses(
  classMap: Record<string, string>,
  _options: TabListClassesOptions = {},
): string {
  return classMap[LIST_BASE] || ""
}

const TAB_BASE = "pm-tabs__tab"

export function tabClasses(options: TabClassesOptions = {}): string {
  const { active = false, disabled = false } = options
  const classes = [TAB_BASE]
  if (active) classes.push(`${TAB_BASE}--active`)
  if (disabled) classes.push(`${TAB_BASE}--disabled`)
  return classes.join(" ")
}

export function tabModuleClasses(
  classMap: Record<string, string>,
  options: TabClassesOptions = {},
): string {
  const { active = false, disabled = false } = options
  const classes = [classMap[TAB_BASE]]
  if (active) classes.push(classMap[`${TAB_BASE}--active`])
  if (disabled) classes.push(classMap[`${TAB_BASE}--disabled`])
  return classes.filter(Boolean).join(" ")
}

const PANEL_BASE = "pm-tabs__panel"

export function tabPanelClasses(_options: TabPanelClassesOptions = {}): string {
  return PANEL_BASE
}

export function tabPanelModuleClasses(
  classMap: Record<string, string>,
  _options: TabPanelClassesOptions = {},
): string {
  return classMap[PANEL_BASE] || ""
}
