import type {
  CollapsibleClassesOptions,
  CollapsibleTriggerClassesOptions,
  CollapsibleContentClassesOptions,
} from "./collapsible.types.js"

const BASE = "pm-collapsible"

export function collapsibleClasses(options: CollapsibleClassesOptions = {}): string {
  const { open = false, disabled = false, size = "md" } = options
  const classes = [BASE, `${BASE}--${size}`]

  if (open) classes.push(`${BASE}--open`)
  if (disabled) classes.push(`${BASE}--disabled`)

  return classes.join(" ")
}

export function collapsibleModuleClasses(
  classMap: Record<string, string>,
  options: CollapsibleClassesOptions = {},
): string {
  const { open = false, disabled = false, size = "md" } = options

  const classes = [classMap[BASE], classMap[`${BASE}--${size}`]]

  if (open) classes.push(classMap[`${BASE}--open`])
  if (disabled) classes.push(classMap[`${BASE}--disabled`])

  return classes.filter(Boolean).join(" ")
}

export function collapsibleTriggerClasses(options: CollapsibleTriggerClassesOptions = {}): string {
  const { open = false, disabled = false, size = "md" } = options
  const classes = [`${BASE}__trigger`, `${BASE}__trigger--${size}`]

  if (open) classes.push(`${BASE}__trigger--open`)
  if (disabled) classes.push(`${BASE}__trigger--disabled`)

  return classes.join(" ")
}

export function collapsibleTriggerModuleClasses(
  classMap: Record<string, string>,
  options: CollapsibleTriggerClassesOptions = {},
): string {
  const { open = false, disabled = false, size = "md" } = options

  const classes = [classMap[`${BASE}__trigger`], classMap[`${BASE}__trigger--${size}`]]

  if (open) classes.push(classMap[`${BASE}__trigger--open`])
  if (disabled) classes.push(classMap[`${BASE}__trigger--disabled`])

  return classes.filter(Boolean).join(" ")
}

export function collapsibleContentClasses(options: CollapsibleContentClassesOptions = {}): string {
  const { open = false, size = "md" } = options
  const classes = [`${BASE}__content`, `${BASE}__content--${size}`]

  if (open) classes.push(`${BASE}__content--open`)

  return classes.join(" ")
}

export function collapsibleContentModuleClasses(
  classMap: Record<string, string>,
  options: CollapsibleContentClassesOptions = {},
): string {
  const { open = false, size = "md" } = options

  const classes = [classMap[`${BASE}__content`], classMap[`${BASE}__content--${size}`]]

  if (open) classes.push(classMap[`${BASE}__content--open`])

  return classes.filter(Boolean).join(" ")
}
