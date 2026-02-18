import type {
  SplitterClassesOptions,
  SplitterPanelClassesOptions,
  SplitterHandleClassesOptions,
} from "./splitter.types.js"

const BASE = "pm-splitter"
const PANEL = "pm-splitter__panel"
const HANDLE = "pm-splitter__handle"

/**
 * Returns BEM class names for the splitter container (human-readable).
 * Used by CDN and template consumers.
 */
export function splitterClasses(options: SplitterClassesOptions = {}): string {
  const { orientation = "horizontal", disabled } = options
  const classes = [BASE, `${BASE}--${orientation}`]

  if (disabled) classes.push(`${BASE}--disabled`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the splitter container (hashed).
 * Used by bundled/template consumers who import CSS modules.
 */
export function splitterModuleClasses(
  classMap: Record<string, string>,
  options: SplitterClassesOptions = {},
): string {
  const { orientation = "horizontal", disabled } = options

  const classes = [classMap[BASE], classMap[`${BASE}--${orientation}`]]

  if (disabled) classes.push(classMap[`${BASE}--disabled`])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for the splitter panel (human-readable).
 */
export function splitterPanelClasses(options: SplitterPanelClassesOptions = {}): string {
  const { collapsed, collapsible } = options
  const classes = [PANEL]

  if (collapsed) classes.push(`${PANEL}--collapsed`)
  if (collapsible) classes.push(`${PANEL}--collapsible`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the splitter panel (hashed).
 */
export function splitterPanelModuleClasses(
  classMap: Record<string, string>,
  options: SplitterPanelClassesOptions = {},
): string {
  const { collapsed, collapsible } = options

  const classes = [classMap[PANEL]]

  if (collapsed) classes.push(classMap[`${PANEL}--collapsed`])
  if (collapsible) classes.push(classMap[`${PANEL}--collapsible`])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for the splitter handle (human-readable).
 */
export function splitterHandleClasses(options: SplitterHandleClassesOptions = {}): string {
  const { active, orientation = "horizontal" } = options
  const classes = [HANDLE, `${HANDLE}--${orientation}`]

  if (active) classes.push(`${HANDLE}--active`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the splitter handle (hashed).
 */
export function splitterHandleModuleClasses(
  classMap: Record<string, string>,
  options: SplitterHandleClassesOptions = {},
): string {
  const { active, orientation = "horizontal" } = options

  const classes = [classMap[HANDLE], classMap[`${HANDLE}--${orientation}`]]

  if (active) classes.push(classMap[`${HANDLE}--active`])

  return classes.filter(Boolean).join(" ")
}
